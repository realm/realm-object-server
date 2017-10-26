## 2.0.7

### Breaking changes
* None

### Bugs fixed
* Fixed several possible race conditions during server start and stop.

### Enhancements
* None

### Internals
* Introduces a timeout function which will race a regular promise. This is crucial for avoiding deadlocks in service requests.
* SyncProxyService now uses a shared cache of backend promises, creating less work when multiple connections for the same realm happen at the same time. Also avoids race conditions in this case.
* Introduced a RealmFactory class which can provide access to Realms on backend sync workers. This is now separated from the Server class.
* Introduced ServerState, which is used to prohibit request processing when a service is not completely ready. This avoids some race conditions, mostly during shutdown. Possible fix for #327.
* discovery.watchService will now fire an available event if the service is available when called. This simplifies a lot of situations where this is done by the caller.


## 2.0.6

### Breaking changes
* None

### Bugs fixed
* Switch to `realm-sync-2.1.0`, which fixes a "use-after-free" crash in
  realm-sync-server node package.

### Enhancements
* None

### Internals
* Switch to `realm-2.0.1`.

## 2.0.5

### Breaking changes
* None

### Bugs fixed
* Check Node version and present error message if not up-to-date
* Fixed an issue where revoking a user's permissions to a realm was not reflected
  back to the owner's permission realm.
* Fixed an issue that causes a refresh token query to fail when the token has already expired [\#583](https://github.com/realm/ros/issues/583)  

### Enhancements
* None

### Internals
* None

## 2.0.4

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* Skip prompt with `ROS_SKIP_PROMPTS` environment variable

## 2.0.3

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* The default IP when starting ROS is now 0.0.0.0 instead of 127.0.0.1.

## 2.0.2

### Breaking changes
* None

### Bugs fixed
* Generating a template with `ros init --template ts` will now have the correct `@types/*` because they have been moved out of `devDependencies` and into `dependencies`

### Enhancements
* None

### Internals
* `@types/*` for core runtime modules have been moved out of `devDependencies` and into `dependencies`


## 2.0.1

### Breaking changes
* None

### Bugs fixed
* Fixed `ros init` failing due to missing template files

### Enhancements
* None

### Internals
* None

## 2.0.0

### Breaking changes
* `realm-object-server-agreement.json` now requires 3 keys: `email`, `terms` and `agreeToLearnAboutUpdatesAndFixes`

### Bugs fixed
* Fixed Terms of Service agreement for Docker image

### Enhancements
* Added ROS init with a typescript and javascript flag

### Internals
* Publishes docker image to `realm/realm-object-server` (new location).
* Update to realm-2.0.0

## 2.0.0-rc.12

### Breaking changes
* None

### Bugs fixed
* Addressed a race condition where Realm.open can be called twice for the same Synced Realm
* Addressed an undefined object error where a Realm is open (but there is no sync session) and discovery issues a service handle change.

### Enhancements
* None

### Internals
* Fix the flaky permission tests


## 2.0.0-rc.11

### Fixed Bugs

* Log level from command line is propagated to sync server.
* Public and private key from the command line are used by the server.


## 2.0.0-rc.10

### Enhancements

* Added register argument to server.getSyncedRealm. This ensures that the
  SyncedRealm is not persisted in the cache.

### Fixed Bugs

* Ensure that services that require SyncedRealms have all required data before
  serving requests


## 2.0.0.rc9

### Breaking changes

### Fixed bugs
* Fixed a situation where getting a userId could be null in updateOrCreateUserPermissionWithAdminPermission in PermissionsService

## 2.0.0.rc8

### Breaking changes

### Enhancements
* Also skip Email prompts if ROS_SKIP_PROMPTS environment var is set.

### Fixed bugs
* Fixed OnDemand Permissions from Admin Realm now handles wildcard permissions appropriately
* Mocha Test now run with compilers, however will need to remove in future.

### Internals

## 2.0.0.rc7

### Breaking changes
* Access tokens now have `sync_label` instead of `syncLabel` when in serialized
  form.

### Enhancements
* Added the agreement to license email step for the BasicServer

### Fixed bugs
* SyncProxyService: Fixed an issue when using sharded sync workers
* Fixed the issue when a synced realm used internally would be undefined or
  invalidated because of sync worker unavailability.

### Internals

* Changed the SyncedRealm class to return a Promise<Realm>. Once it resolves,
  the Realm is there, with valid syncSession which does not get destroyed when
  the sync worker fails over. It utilizes the new override_server() API to
  make the session reconnect to the new sync worker.
* Fixed all the other parts of ROS which use SyncedRealm. Some functions become
  async because of that.
* Changed the way the server starts and stops. Now there is no barrier between
  starting services and registering them. This is required, because now some
  services, in order to start, wait for the Sync service to register.
* Update JS to RC22 and Sync to 2.0.2
* Updated the schema for `/__wildcardpermissions` to match the `/~/__permission` Realms, using `userId = *` for these `Permission` objects.

## 2.0.0-rc.6

### Fixed bugs
* Fixed a bug in HTTPS support (sync proxy) [\#512](https://github.com/realm/ros/issues/512)


## 2.0.0-rc5

### Breaking changes

* Changed the password provider and PasswordRealm schema.
  The PasswordRealm now stores iterations, key length, and digest for each row.
* Changed the default digest from sha256 to sha512 in the password provider.

### Enhancements

* Add deleteUser to the AuthProvider API as an optional method.
* Implemented deleteUser for the password provider.
* Added provider User deletions to the AuthService.

### Fixed bugs

* "--loglevel all" was rejected. [\#500](https://github.com/realm/ros/issues/500)
* loglevel passed via CLI was ignored. [\#509](https://github.com/realm/ros/issues/509)
* Permission change by email now is processed correctly [\#508](https://github.com/realm/ros/issues/508) [\#426](https://github.com/realm/ros/issues/426)

### Internals

* Changed the default size of the salt length from 10,000 to 32 bytes.
* New unit tests for the password provider.
* Upgraded the migration script to take the new PasswordRealm schema into account.
* Adding name and reason when throwing InvalidParameters.
* Update JS to RC-20


## 2.0.0-rc4

### Breaking changes

### Enhancements

* Added support for HTTPS.

### Fixed bugs

### Internals


## 2.0.0-rc3

### Breaking changes

### Enhancements

* Documentation for manual backup.

### Fixed bugs

* Permission changes now work properly when reducing privileges [\#438](https://github.com/realm/ros/issues/438)
* Changed the name of `__starpermissions` Realm to `__wildcardpermissions`. The object class
  name in it is now just `Permission` instead of `StarSpecificPermission`.
* All users now have read-only access to `__wildcardpermissions` on startup [\#431](https://github.com/realm/ros/issues/431)
* Grantor permission are reflected [\#491](https://github.com/realm/ros/issues/491) and [\#427](https://github.com/realm/ros/issues/427)
* If attempting to change permissions with a metadata value matching no users, an error is thrown instead of stalling forever.

### Internals

* Integration tests for Realm deletion.
* Integration tests for user deletion.
* Lint clean up.
* Moved CLI functionality to BasicServer

## 2.0.0-rc2

### Enhancements

* There is now a migration tool integrated into ros cli.
* The API for user and realm deletion has been added.

-----8<----- FIXME: remove old automatically generated stuff below? -----8<-----

## [v2.0.0-alpha.46](https://github.com/realm/ros/tree/v2.0.0-alpha.46) (2017-10-04)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.45...v2.0.0-alpha.46)

## [v2.0.0-alpha.45](https://github.com/realm/ros/tree/v2.0.0-alpha.45) (2017-10-03)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.44...v2.0.0-alpha.45)

**Fixed bugs:**

- Cannot set permissions by username [\#439](https://github.com/realm/ros/issues/439)
- Test failures with ros rc44 [\#428](https://github.com/realm/ros/issues/428)

## [v2.0.0-alpha.44](https://github.com/realm/ros/tree/v2.0.0-alpha.44) (2017-10-02)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.43...v2.0.0-alpha.44)

**Implemented enhancements:**

- Support for Partial Sync [\#199](https://github.com/realm/ros/issues/199)
- Support existing "API" for reading permissions [\#44](https://github.com/realm/ros/issues/44)
- Support existing "API" for changing permission [\#43](https://github.com/realm/ros/issues/43)

**Fixed bugs:**

- Accepting offer create temporary wrong permission [\#417](https://github.com/realm/ros/issues/417)
- Permissions: Non-Admin user can grant permisssions [\#416](https://github.com/realm/ros/issues/416)
- Admin Realm is not updated with Star Permissions for userId [\#414](https://github.com/realm/ros/issues/414)
- Current implementation of Permissions broke ROS [\#346](https://github.com/realm/ros/issues/346)

## [v2.0.0-alpha.43](https://github.com/realm/ros/tree/v2.0.0-alpha.43) (2017-09-30)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.42...v2.0.0-alpha.43)

## [v2.0.0-alpha.42](https://github.com/realm/ros/tree/v2.0.0-alpha.42) (2017-09-30)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.41...v2.0.0-alpha.42)

## [v2.0.0-alpha.41](https://github.com/realm/ros/tree/v2.0.0-alpha.41) (2017-09-30)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.40...v2.0.0-alpha.41)

**Fixed bugs:**

- Permissions Appear Still Broken [\#403](https://github.com/realm/ros/issues/403)

## [v2.0.0-alpha.40](https://github.com/realm/ros/tree/v2.0.0-alpha.40) (2017-09-28)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.39...v2.0.0-alpha.40)

**Fixed bugs:**

- error: Sync Connection\[19\]: Session\[2\]: Client file already bound in other session  [\#374](https://github.com/realm/ros/issues/374)
- /auth/password is broken for non-admin and admin users [\#335](https://github.com/realm/ros/issues/335)

## [v2.0.0-alpha.39](https://github.com/realm/ros/tree/v2.0.0-alpha.39) (2017-09-27)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.38...v2.0.0-alpha.39)

**Fixed bugs:**

- Lookup for `syncLabel` with admin token fails [\#376](https://github.com/realm/ros/issues/376)
- Unhandled promise when logging in user [\#360](https://github.com/realm/ros/issues/360)

## [v2.0.0-alpha.38](https://github.com/realm/ros/tree/v2.0.0-alpha.38) (2017-09-26)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.37...v2.0.0-alpha.38)

**Implemented enhancements:**

- Test Automatic Failover [\#328](https://github.com/realm/ros/issues/328)
- Use ServiceWatch in SyncProxy [\#324](https://github.com/realm/ros/issues/324)
- Update bindings to call into new /users API endpoint [\#42](https://github.com/realm/ros/issues/42)

**Fixed bugs:**

- Schema for \_\_admin Realm does not match [\#373](https://github.com/realm/ros/issues/373)
- UnhandledPromiseRejectionWarning after re-connecting from offline [\#368](https://github.com/realm/ros/issues/368)
- Invalid json in request results in 500 [\#363](https://github.com/realm/ros/issues/363)

## [v2.0.0-alpha.37](https://github.com/realm/ros/tree/v2.0.0-alpha.37) (2017-09-25)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.36...v2.0.0-alpha.37)

**Implemented enhancements:**

- Access to Realm Studio should be possible to restrict to specific IP addresses [\#178](https://github.com/realm/ros/issues/178)

**Fixed bugs:**

- Unable to access admin realm from Realm Studio or bindings [\#278](https://github.com/realm/ros/issues/278)

## [v2.0.0-alpha.36](https://github.com/realm/ros/tree/v2.0.0-alpha.36) (2017-09-22)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.35...v2.0.0-alpha.36)

**Implemented enhancements:**

- Create auth subclasses for existing auth providers [\#35](https://github.com/realm/ros/issues/35)
- Migration of permissions from ROS 1.x [\#18](https://github.com/realm/ros/issues/18)

**Fixed bugs:**

- Sometimes the admin user cannot get an access token [\#338](https://github.com/realm/ros/issues/338)
- Regular users cannot access /auth/users/:provider/:providerId [\#333](https://github.com/realm/ros/issues/333)

## [v2.0.0-alpha.35](https://github.com/realm/ros/tree/v2.0.0-alpha.35) (2017-09-20)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.34...v2.0.0-alpha.35)

**Implemented enhancements:**

- Support multiple authentication providers [\#244](https://github.com/realm/ros/issues/244)

**Fixed bugs:**

- Wrong provider to auth/provider/provider returns 500 [\#310](https://github.com/realm/ros/issues/310)
- Security issue: Can use REST endpoints with a revoked token [\#309](https://github.com/realm/ros/issues/309)
- Tests failing with Node 7 and 8 that pass in Node 6 [\#307](https://github.com/realm/ros/issues/307)
- Getting same refreshToken back on login after it was revoked [\#304](https://github.com/realm/ros/issues/304)
- Wrong input to /auth/users/realm-admin/password gives 500 [\#300](https://github.com/realm/ros/issues/300)
- Race condition between /health/ and admin user being created [\#282](https://github.com/realm/ros/issues/282)

## [v2.0.0-alpha.34](https://github.com/realm/ros/tree/v2.0.0-alpha.34) (2017-09-19)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.33...v2.0.0-alpha.34)

## [v2.0.0-alpha.33](https://github.com/realm/ros/tree/v2.0.0-alpha.33) (2017-09-19)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.32...v2.0.0-alpha.33)

**Fixed bugs:**

- Usernames should not cause tilde expansion to generate invalid paths [\#258](https://github.com/realm/ros/issues/258)

## [v2.0.0-alpha.32](https://github.com/realm/ros/tree/v2.0.0-alpha.32) (2017-09-18)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.31...v2.0.0-alpha.32)

## [v2.0.0-alpha.31](https://github.com/realm/ros/tree/v2.0.0-alpha.31) (2017-09-18)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.30...v2.0.0-alpha.31)

**Fixed bugs:**

- URI is not defined [\#289](https://github.com/realm/ros/issues/289)
- Refresh Tokens Are Not Created Correctly [\#286](https://github.com/realm/ros/issues/286)
- Major Security risk: `/Auth/users` setting isAdmin flag without authentication [\#268](https://github.com/realm/ros/issues/268)
- Errors are not reported using RFC7807 [\#267](https://github.com/realm/ros/issues/267)
- Security problem: Slashes in usernames allow stealing access to other users' Realms [\#265](https://github.com/realm/ros/issues/265)
- ROS cannot create admin user [\#253](https://github.com/realm/ros/issues/253)
- Can't shutdown ros with ctrl-C after an error. [\#234](https://github.com/realm/ros/issues/234)
- Two users creating `/~/test-realm` will result in a single realm in the RealmManagementService [\#153](https://github.com/realm/ros/issues/153)

## [v2.0.0-alpha.30](https://github.com/realm/ros/tree/v2.0.0-alpha.30) (2017-09-13)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.29...v2.0.0-alpha.30)

**Implemented enhancements:**

- Use public realm-js in ROS via feature token gating [\#31](https://github.com/realm/ros/issues/31)

## [v2.0.0-alpha.29](https://github.com/realm/ros/tree/v2.0.0-alpha.29) (2017-09-13)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.28...v2.0.0-alpha.29)

**Implemented enhancements:**

- Log the version of ros when starting ros. [\#232](https://github.com/realm/ros/issues/232)
- New API for retrieving users and metadata [\#115](https://github.com/realm/ros/issues/115)

**Fixed bugs:**

- Capture realm-js logs for the logger [\#228](https://github.com/realm/ros/issues/228)

## [v2.0.0-alpha.28](https://github.com/realm/ros/tree/v2.0.0-alpha.28) (2017-09-12)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.27...v2.0.0-alpha.28)

**Fixed bugs:**

- "Failed to switch protocols" [\#229](https://github.com/realm/ros/issues/229)

## [v2.0.0-alpha.27](https://github.com/realm/ros/tree/v2.0.0-alpha.27) (2017-09-12)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.26...v2.0.0-alpha.27)

## [v2.0.0-alpha.26](https://github.com/realm/ros/tree/v2.0.0-alpha.26) (2017-09-12)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.25...v2.0.0-alpha.26)

## [v2.0.0-alpha.25](https://github.com/realm/ros/tree/v2.0.0-alpha.25) (2017-09-11)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.24...v2.0.0-alpha.25)

## [v2.0.0-alpha.24](https://github.com/realm/ros/tree/v2.0.0-alpha.24) (2017-09-10)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.23...v2.0.0-alpha.24)

## [v2.0.0-alpha.23](https://github.com/realm/ros/tree/v2.0.0-alpha.23) (2017-09-09)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.22...v2.0.0-alpha.23)

## [v2.0.0-alpha.22](https://github.com/realm/ros/tree/v2.0.0-alpha.22) (2017-09-07)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.21...v2.0.0-alpha.22)

**Implemented enhancements:**

- Create simple logging implementation [\#49](https://github.com/realm/ros/issues/49)

## [v2.0.0-alpha.21](https://github.com/realm/ros/tree/v2.0.0-alpha.21) (2017-09-07)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.20...v2.0.0-alpha.21)

## [v2.0.0-alpha.20](https://github.com/realm/ros/tree/v2.0.0-alpha.20) (2017-09-07)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.19...v2.0.0-alpha.20)

## [v2.0.0-alpha.19](https://github.com/realm/ros/tree/v2.0.0-alpha.19) (2017-09-07)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.18...v2.0.0-alpha.19)

**Implemented enhancements:**

- Create default entrypoint [\#167](https://github.com/realm/ros/issues/167)
- Logging Server implementation [\#107](https://github.com/realm/ros/issues/107)
- Create Consul implementation of Discovery [\#62](https://github.com/realm/ros/issues/62)

**Fixed bugs:**

- ROS Agreed To Terms needs more fields and needs to be disabled during development [\#158](https://github.com/realm/ros/issues/158)
- Validate auth tokens throughout code base [\#94](https://github.com/realm/ros/issues/94)

## [v2.0.0-alpha.18](https://github.com/realm/ros/tree/v2.0.0-alpha.18) (2017-08-30)
[Full Changelog](https://github.com/realm/ros/compare/v2.0.0-alpha.0...v2.0.0-alpha.18)

**Implemented enhancements:**

- REST Permissions API implementation [\#109](https://github.com/realm/ros/issues/109)
- Design and implement ws notifications for RealmManagement and Auth Services [\#97](https://github.com/realm/ros/issues/97)
- Build Discovery/interservice communication transport implementations [\#96](https://github.com/realm/ros/issues/96)
- Exposing static files is hard [\#82](https://github.com/realm/ros/issues/82)
- The request params are not passed to service endpoint handlers [\#81](https://github.com/realm/ros/issues/81)
- Data directory and key paths should be configurable for all services [\#77](https://github.com/realm/ros/issues/77)
- Rename `authenticate` to `authenticateOrCreateUser` [\#66](https://github.com/realm/ros/issues/66)
- Integrate realm-sync-server into new service architecture [\#17](https://github.com/realm/ros/issues/17)

**Fixed bugs:**

- Services added using `addService` are not started [\#88](https://github.com/realm/ros/issues/88)
- The request params are not passed to service endpoint handlers [\#81](https://github.com/realm/ros/issues/81)
- Base HttpEndpoints should not have parameters and need to be unique [\#67](https://github.com/realm/ros/issues/67)
- UsernamePassword service should return an error when given a bad password for an existing user [\#30](https://github.com/realm/ros/issues/30)
- auth service should return the proper http codes and descriptive error messages for any errors [\#27](https://github.com/realm/ros/issues/27)
- Tests no longer run on CI - Test app never exits [\#25](https://github.com/realm/ros/issues/25)

## [v2.0.0-alpha.0](https://github.com/realm/ros/tree/v2.0.0-alpha.0) (2017-07-28)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
