# Security Vulnerability Report

## Summary
This report documents the security vulnerabilities found in the d3-angular project and the actions taken to address them.

## Fixed Vulnerabilities

### Critical: tar Package (CVE-2026-23745)
- **Status**: ✅ FIXED (resolved via Angular 21 upgrade)
- **Severity**: High
- **CVE**: CVE-2026-23745
- **Package**: tar
- **Solution**: Resolved transitively by upgrading Angular dependencies to v21; no longer requires a separate override

### Critical: Angular XSS Vulnerabilities
- **Status**: ✅ FIXED
- **Severity**: High/Critical
- **Previous Version**: Angular 10.0.14
- **Fixed Version**: Angular 21.1.5
- **Issues Fixed**:
  - GHSA-jrmj-c5cx-3cw6: Angular has XSS Vulnerability via Unsanitized SVG Script Attributes
  - GHSA-v4hv-rgfq-gp49: Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attributes
  - GHSA-c75v-2vq8-878f: Angular vulnerable to Cross-site Scripting
  - GHSA-58c5-g7wp-6w37: XSRF Token Leakage via Protocol-Relative URLs in Angular HTTP Client
- **Solution**: Upgraded Angular from version 10 to 21.1.5
- **Impact**: All Angular-related XSS vulnerabilities completely resolved

### High: d3-color ReDoS Vulnerability (GHSA-36jr-mh4h-2g58)
- **Status**: ✅ FIXED
- **Severity**: High
- **Package**: d3-color < 3.1.0 (transitively through d3 v6)
- **Fixed Version**: d3 upgraded from v6 to v7.9.0, which uses d3-color >= 3.1.0
- **Solution**: Upgraded d3 from ^6.0.0 to ^7.0.0

### Moderate: minimatch ReDoS (old advisory)
- **Status**: ✅ FIXED (partial)
- **Severity**: Moderate
- **Package**: minimatch < 3.0.5
- **Solution**: Added npm override `"minimatch": "^3.0.5"`

## Remaining Vulnerabilities

### Moderate: ajv ReDoS (GHSA-2g4f-4pwh-qvx6)
- **Status**: ⚠️ CANNOT FIX without breaking Angular
- **Severity**: Moderate
- **Package**: ajv 7.x–8.x (transitive dependency of @angular-devkit/core)
- **Reason not fixed**: The only available fix requires downgrading @angular/cli to v11, which is a breaking change
- **Impact**: Build-time tool only; no impact on production runtime

### High: minimatch ReDoS via repeated wildcards (GHSA-3ppc-4f35-3m26)
- **Status**: ⚠️ CANNOT FIX without breaking karma
- **Severity**: High
- **Package**: minimatch < 10.2.1 (transitive dependency of karma)
- **Reason not fixed**: The fix (minimatch >=10.2.1) has breaking API changes incompatible with karma v6's internal use of minimatch v3. The "fix" offered by npm would require downgrading @angular/build to v19.1.9.
- **Impact**: Dev/test toolchain only; no impact on production runtime

### Security Improvements Summary
- **Angular 10 → 21 upgrade**: Resolved all Angular XSS vulnerabilities
- **d3 v6 → v7 upgrade**: Fixed d3-color ReDoS vulnerability
- **minimatch override**: Fixed old minimatch ReDoS (< 3.0.5)
- **Remaining**: 16 vulnerabilities remain in build/test toolchain (ajv, minimatch v10.2.1 requirement), not fixable without breaking Angular or karma

## Major Framework Upgrade

**Angular 19 → Angular 21.1.5 Upgrade Completed**

### Migration Changes Applied (19 → 21)
- Upgraded all @angular/* packages to v21.1.5
- Upgraded @angular-devkit/build-angular to v21.1.4
- Upgraded @angular/cli to v21.1.4
- Added @angular/build v21.1.4 (new esbuild-based builder package)
- Switched build system from `@angular-devkit/build-angular:browser` (Webpack) to `@angular/build:application` (esbuild)
- Switched dev server from `@angular-devkit/build-angular:dev-server` to `@angular/build:dev-server`
- Removed deprecated e2e/protractor configuration from angular.json
- Updated TypeScript to 5.9.3 (required by Angular 21)
- Updated zone.js to 0.16.x
- Updated RxJS to 7.8.x
- Updated tsconfig: `module` → ES2022, `moduleResolution` → bundler
- Removed `NODE_OPTIONS='--openssl-legacy-provider'` (no longer needed with esbuild)
- Removed protractor, jasmine-spec-reporter, ts-node, @types/jasminewd2 (all e2e-related)
- Updated karma plugins: replaced `karma-coverage-istanbul-reporter` with `karma-coverage`
- Updated jasmine and karma type packages for Angular 21 compatibility

### d3 v6 → v7 Upgrade
- Upgraded d3 from ^6.0.0 to ^7.0.0
- Updated @types/d3 from ^5.7.2 to ^7.4.0
- No API breaking changes in the existing chart components (bar, pie, scatter)

## Build Status
- ✅ Build successful (Angular 21.1.5 with esbuild)
- ✅ All D3 charts render correctly
- ✅ d3-color ReDoS vulnerability resolved
- ✅ Angular XSS vulnerabilities completely resolved
- ✅ No longer requires `NODE_OPTIONS='--openssl-legacy-provider'` workaround

## Recommendations

### Future Actions
1. **Migrate E2E Tests**: Replace old Protractor configuration with Cypress or Playwright
   - Protractor is removed in Angular 21
   - Modern alternatives provide better performance and reliability

2. **Regular Dependency Audits**: Set up automated dependency scanning
   - Use GitHub Dependabot or similar tools
   - Schedule quarterly dependency update reviews

3. **Consider ESLint**: Add ESLint for code quality checks
   - Angular recommends using ESLint
   - Can be added via: `ng add @angular-eslint/schematics`

