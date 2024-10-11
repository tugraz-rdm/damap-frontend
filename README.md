# maDMPs Frontend Project for TU Graz

This repository contains the source code for the frontend of DAMAP, developed as part of the TU Graz implementation. DAMAP (Data Management Plan) is a tool aimed at creating machine-actionable data management plans (maDMPs), facilitating better data management practices in research.

DAMAP is based on the concept of machine-actionable Data Management Plans (maDMPs) and was originally developed by TU Wien. It integrates institutional systems to collect project information, research data, and personnel data, reducing the need for redundant data entry. The system provides both human-readable DMPs and machine-actionable versions that can be integrated into workflows.

We at TU Graz also contribute to the base DAMAP implementation, collaborating closely to enhance its functionality and adapt it to institutional needs.

## DAMAP Frontend

This project is based on the DAMAP frontend developed in cooperation between TU Wien and TU Graz, but has been adapted to meet the specific needs of the TUGraz DMP Tool. This adaptation focuses on institutional integration, allowing researchers to manage their Data Management Plans (DMPs) efficiently, leveraging existing systems at the institution.

The project uses [Angular](https://angular.io/) as its framework and relies on [NX](https://nx.dev/) as a build system.

### Development Server

To run the development server:

```bash
nx serve damap-frontend
```

This will start the dev server, and the app will be accessible at `http://localhost:4200/`. Any changes made to the source files will trigger automatic reloading.

### Build

To build the project for production:

```bash
nx build damap-frontend
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running Unit Tests

To run the unit tests:

- For the DAMAP library:

  ```bash
  nx test damap
  ```

- For the DAMAP frontend:

  ```bash
  nx test damap-frontend
  ```

### Running with Docker

To run the frontend and backend together in a dockerized setup, please refer to the [DAMAP backend repository](https://github.com/tugraz-rdm/damap-backend) for further instructions.

### Customisation

For customising the DAMAP frontend, please refer to the [CUSTOMISING](CUSTOMISING.md) page.

## Authors

- David Eckhard
- Laura Thaci
- Mojib Wali

## Screenshots

![DMP-Tool-TUGraz](https://github.com/user-attachments/assets/81922d01-f12f-46b2-9a39-2f4941592d32)
