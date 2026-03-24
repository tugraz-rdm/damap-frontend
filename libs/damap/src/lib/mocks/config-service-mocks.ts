import { Config } from '../domain/config';
import { ServiceConfig } from '../domain/config-services';

// Mock data for service config
export const serviceConfigMockData: ServiceConfig[] = [
  { displayText: 'UNIVERSITY', queryValue: 'UNIVERSITY' },
  { displayText: 'ORCID', queryValue: 'ORCID' },
];

// Mock data for config
export const configMockData: Config = {
  issuer: '',
  clientID: '',
  responseType: 'code',
  scope: '',
  userRolesClaimPath: '',
  userIdClaim: '',
  nameClaim: '',
  givenNameClaim: '',
  familyNameClaim: '',
  emailClaim: '',
  adminRoleName: '',
  env: '',
  appTitle: '',
  personSearchServiceConfigs: serviceConfigMockData,
  fitsServiceAvailable: true,
  livePreviewAvailable: true,
  ethicalReportEnabled: true,
};
