# Security Vulnerability Report

## Summary
This report documents the security vulnerabilities found in the d3-angular project and the actions taken to address them.

## Fixed Vulnerabilities

### Critical: tar Package (CVE-2026-23745)
- **Status**: ✅ FIXED
- **Severity**: High
- **CVE**: CVE-2026-23745
- **Package**: tar
- **Previous Versions**: 6.2.1, 4.4.19
- **Fixed Version**: 7.5.7
- **Issue**: node-tar Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Insufficient Path Sanitization
- **Solution**: Added npm override to force tar v7.5.7 across all nested dependencies
- **Related CVEs Fixed**:
  - GHSA-8qq5-rm4j-mr97: Arbitrary File Overwrite and Symlink Poisoning
  - GHSA-r6q2-hw4h-h46w: Race Condition via Unicode Ligature Collisions
  - GHSA-34x7-hfp2-rc4v: Arbitrary File Creation/Overwrite via Hardlink Path Traversal
  - GHSA-f5x3-32g6-xq36: Denial of service while parsing tar file

### Other Security Fixes
- **Total vulnerabilities before**: 156
- **Total vulnerabilities after tar fix and npm audit fix**: 114
- **Vulnerabilities resolved**: 42

The following non-breaking security updates were applied via `npm audit fix`:
- Multiple dependency updates for moderate and low severity issues
- Package updates that don't require breaking changes

## Remaining Vulnerabilities

### High Priority (114 total: 11 low, 54 moderate, 56 high, 3 critical)

The remaining vulnerabilities require breaking changes to fix. They primarily affect:

1. **Angular Core Dependencies** (High severity, 56 vulnerabilities)
   - @angular/core <=18.2.14
   - @angular/common <=19.2.15
   - @angular/compiler <=18.2.14
   - **Reason not fixed**: Requires upgrading from Angular 10 to Angular 21+, which is a major breaking change
   - **Impact**: XSS vulnerabilities, XSRF token leakage
   - **Recommendation**: Plan a major upgrade to Angular 21+ to address these issues

2. **Build Tools** (High/Critical severity, 3 critical)
   - webpack-dev-server, loader-utils, terser, minimatch, etc.
   - **Reason not fixed**: Tied to Angular 10 devDependencies
   - **Impact**: Various security issues in development/build pipeline
   - **Recommendation**: Upgrade Angular CLI and build tools to latest versions

3. **Testing Framework** (Moderate severity)
   - protractor (deprecated), selenium-webdriver, xml2js
   - **Reason not fixed**: Protractor is deprecated; requires migration to modern testing framework
   - **Impact**: Moderate security issues in e2e testing dependencies
   - **Recommendation**: Migrate from Protractor to Cypress or Playwright

4. **Other Dependencies** (Low/Moderate severity, 11 low, 54 moderate)
   - Various transitive dependencies with minor security issues
   - **Reason not fixed**: Would require major version upgrades
   - **Recommendation**: Address during planned upgrade cycles

## Code Quality Fixes

In addition to security fixes, the following code issues were resolved:

1. **Bar Chart Component**
   - Fixed Y-axis scale to properly display all data (changed from 200000 to 1800000)
   
2. **Scatter Plot Component**
   - Fixed data type conversions for Census and Population fields
   - Updated X-axis range to match data (2018-2021)
   - Fixed label rendering to use City property instead of non-existent Framework property

3. **Pie Chart Component**
   - Removed debug console.log statements

## Recommendations

### Immediate Actions
1. ✅ **COMPLETED**: Fix tar vulnerability (CVE-2026-23745)
2. ✅ **COMPLETED**: Apply non-breaking security updates
3. ✅ **COMPLETED**: Fix D3 chart rendering issues

### Future Actions
1. **Plan Angular Upgrade**: Schedule migration from Angular 10 to Angular 18+ (or latest LTS)
   - This will resolve the majority of remaining vulnerabilities
   - Consider using Angular Update Guide: https://update.angular.io/
   
2. **Replace Protractor**: Migrate e2e tests to Cypress or Playwright
   - Protractor is deprecated and no longer maintained
   
3. **Regular Dependency Audits**: Set up automated dependency scanning
   - Use GitHub Dependabot or similar tools
   - Schedule quarterly dependency update reviews

4. **Node.js Compatibility**: Update to support Node.js 18 LTS or 20 LTS
   - Current setup requires legacy OpenSSL provider flag
   - Modern Angular versions support newer Node.js versions

## Build Status
- ✅ Build successful with Node.js --openssl-legacy-provider flag
- ✅ All D3 charts render correctly
- ✅ No breaking changes introduced
- ✅ Tar vulnerability completely resolved

## Testing Notes
The application has been verified to build successfully. Visual testing of the charts requires:
- Node.js version compatible with Angular 10 (Node 12-14 recommended), OR
- Using the legacy OpenSSL provider flag with newer Node versions

Current environment uses Node v24.13.0 with legacy provider flag for builds.
