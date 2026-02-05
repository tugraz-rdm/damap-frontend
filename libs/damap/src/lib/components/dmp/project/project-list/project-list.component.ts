import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  merge,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';

import { BackendService } from '../../../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Project } from '../../../../domain/project';
import { SearchResult } from '../../../../domain/search/search-result';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  standalone: false,
})
export class ProjectListComponent implements OnInit {
  @Output() projectToSet = new EventEmitter<Project>();
  private _selectedProject: Project;

  @Input()
  get selectedProject(): Project {
    return this._selectedProject;
  }

  set selectedProject(project: Project) {
    this._selectedProject = project;
    if (project === null) {
      this.fetchRecommendedProjects();
    }
  }

  private searchTerms = new Subject<string>();
  private recommendedProjects$: Observable<SearchResult<Project>>;
  searchResult$: Observable<SearchResult<Project>> = of({
    items: [],
  } as SearchResult<Project>);

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
  ) {
    // Cache the recommended projects observable so it's not recreated/canceled
    // shareReplay(1) will cache the result and replay it to new subscribers
    // The subscription will be triggered by startWith(null) in ngOnInit
    this.recommendedProjects$ = this.backendService
      .getRecommendedProjects()
      .pipe(
        catchError(error => {
          console.error('Error fetching recommended projects:', error);
          return of({ items: [] } as SearchResult<Project>);
        }),
        shareReplay(1), // Cache the result so multiple subscriptions share the same request
      );
  }

  ngOnInit(): void {
    // Emit null immediately for initial load, then debounce subsequent search terms
    const debouncedSearchTerms$ = this.searchTerms.pipe(debounceTime(300));

    // Merge immediate null emission with debounced search terms
    this.searchResult$ = merge(
      of(null), // Initial load - emit immediately (no debounce)
      debouncedSearchTerms$, // Subsequent searches - debounced
    ).pipe(
      distinctUntilChanged((previous, current) => {
        // Treat null and empty string as the same (both trigger recommended projects)
        const prevIsEmpty =
          previous === null || previous === undefined || previous === '';
        const currIsEmpty =
          current === null || current === undefined || current === '';
        if (prevIsEmpty && currIsEmpty) {
          return true; // Skip duplicate empty/null emissions
        }
        return previous === current;
      }),
      switchMap((term: string) => {
        const normalizedTerm =
          term === null ||
          term === undefined ||
          (typeof term === 'string' && term.trim().length === 0)
            ? null
            : term;

        if (normalizedTerm === null) {
          return this.recommendedProjects$;
        } else {
          // User is searching - fetch search results
          return this.backendService
            .getProjectSearchResult(normalizedTerm)
            .pipe(
              catchError(error => {
                console.error('Error searching projects:', error);
                return of({ items: [] } as SearchResult<Project>);
              }),
            );
        }
      }),
    );
  }

  fetchRecommendedProjects(): void {
    this.search(null);
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  changeProject(event: MatSelectionListChange): void {
    this.projectToSet.emit(event.source.selectedOptions.selected[0]?.value);
  }
}
