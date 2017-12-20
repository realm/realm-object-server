### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


### Breaking changes
* None

### Bugs fixed
* Fixed an issue that allowed non-admin users to create Realms in other users'
home folders.
* Fixed a bug causing the failover logic in SyncProxyService to trigger for
  no good reason. This would manifest itself in "End of input" error messages
  on the client in enterprise/cloud deployments.

### Enhancements
* Added `server.ensureRealmExists` API to create a Realm if it doesn't exist
already.


### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Indicate the version of ROS using `X-Powered-By` Header.
* Added `Server.applyPermissions` method to allow changing permissions without
having to log in with an admin user.


### Breaking changes
* None

### Bugs fixed
* Export the JWT provider

### Enhancements
* Export stats classes and interfaces


### Breaking changes
* None

### Bugs fixed
* Fixed an import statement to make it work on case-sensitive file systems (Linux).
* Fixed a bug rendering `ros backup` useless because of incomplete path
  resolution for `realm-backup`.

### Enhancements
* None


### Breaking changes
* None

### Bugs fixed
* The LogService will now respect token revocations (#735)
* Revoked tokens will now never be assigned to the req.authToken.

### Enhancements
* TypeScript and JavaScript templates now have .gitignore.
* The manual backup command is now available as `ros backup`.


### Breaking changes
* None

### Bugs fixed
* Fixes MixpanelService issue for Enterprise where some stats might not be available until
  the sync proxy is fully running.

### Enhancements
* Added JWT authentication provider. It allows you to create a custom
  authentication service that issues signed Json Web Tokens that contain a
  `userId` and optional `isAdmin` fields. The app then transmits the token to
  ROS which verifies the signature and authenticates a user with the provided
  `userId`.


### Breaking changes
* None

### Bugs fixed
* The health service no longer responds with 200 OK unless the server has fully
  started. It is 503 in case the server is still loading.
* The admin token user can now apply permission changes successfully.
* The early log messages do not get skipped in Studio any more.
* Users now have read-write access to their `/~/__permission` realms (again).
  The recent switch to read-only was an unintended breaking change.
* Fixed a potential race in the permission service. It reported itself started
  before setting up all the listeners and granting default permissions.
* [Object Server] Fixed a bug where deleted-then-recreated objects with identical
  primary keys become empty.
* [Object Server] Fixed a bug in outward partial sync to ensure
  convergence of partial sync in the case where the client creates a primary key object, that is already present on the server, and subscribes to it in the same transaction.
* Added error handling to the internal requests to the load balancer. This
  should fix some unhandled promise rejections.

### Enhancements
* TypeScript and JavaScript templates now have .gitignore


### Breaking changes
* None

### Bugs fixed
* Close all Permission Realm files used to avoid running out of file handles.

### Enhancements
* None


### Breaking changes
* None

### Bugs fixed
* Realms with invalid paths are now rejected. Previously ROS would just create
  unsyncable realms.
* Realms with invalid paths are now skipped during 1-to-2 migration. This is
  required because ROS-1 has the same behavior creating unsyncable realms, which
  we are not going to fix.
* Non-existent data files are not copied during 1-to-2 migration.
* The default port for BasicServer's https is now properly set to 9443
* HTTPS key and cert are now validated before attempting to start
* server.shutdown() is now more forgiving in failed state scenarios

### Enhancements
* Server now has a simple method called `openRealm` that takes a remote path, like `/__admin` for example. This is always opened up with the internal server admin user. The schema is optional. 


# Release 2.0.16

### Breaking changes
* None

### Bugs fixed
* Fixed a problem in the install script where nvm is installed by homebrew.
* Added note to install script reminding the user to use the correct Node.js version.
* Fixed an issue with exporting all custom realm symbols
* Added support Visual Studio Code debugging and running when generating a server setup with `ros init`
* Opening a partially synced Realm before the master Realm was created now works correctly
* Terms of service is now persisted under the user's home directory. Fixes \#550

### Enhancements
* None

### Internals
* Updated the TS and JS templates to be easier to modify.
* Terms of service now generates a distinctId as a UUID and uses that in all mixpanel events. Fixes \#600
* Adding Mixpanel Usage Stats with Incremental timer
* Adds simple stats collection interfaces, loosely matching that of prom-client, a Prometheus stats
  emitter. In developer edition, metrics are stored in-memory, allowing mixpanel to access them.
* Adds ROS usage by emitting to mixpanel data about the connections that go through the SyncProxyService
* Exposes mix panel interface by gating it behind setting a distinctId. This is typically loaded from
  the agreement file.
* Created a MixpanelService which handles emitting stats periodically to mixpanel.


# Release 2.0.15

### Breaking changes
* None

### Bugs fixed
* Fixed a bug preventing from migrating from ROS1 when `cluster_node_id` is
* Fixed a bug in SingleProcessDiscovery where find by tag returned unexpected
  results
* Fixed a bug in PermissionService where the listeners could potentially
  operate on missing or invalidated objects
* Return a proper error when using the admin token to make permission changes
  where the userId might not exist.
* Made sure that all symbols in `./realms/**/*.ts` are now exported

### Enhancements
* None

### Internals
* Extended RealmDirectoryService unit tests
* Created exception class for ServiceUnavailable


# Release 2.0.14

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Update Node in the Docker image to 6.11.5

### Internals
* None

# Release 2.0.13

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* The 1-to-2 migration now checks that the source directory is a valid root dir
  and makes some suggestions if it is not.
* THe 1-to-2 migration now checks that the destination directory is empty and
  fails with a message about that if it is not an empty dir.
* Expose the ROS port on the Docker container, to work with `docker run -P` for exposing on a random port.

### Internals
* None

# Release 2.0.12

### Breaking changes
* None

### Bugs fixed
* The LogService WebSocket endpoints now needs an authentication message with a valid access or refresh token, within
  the first second of connecting to them. Realm Studio sends this message starting from v1.3.0.

### Enhancements
* Added comments to the `ros init` template files to describe available configs
* A welcome page is now available to the user when visiting http://localhost:9080/ in a web-browser.
* Added install script

### Internals
* Added acceptance testing against the install script for multiple platforms.

# Release 2.0.11

### Breaking changes
* None

### Bugs fixed
* Fix installation issue (ursa) on various platforms
* Fix's middlewares not being registered to services 

### Enhancements
* None

### Internals
* Use node-rsa in favor of ursa.

# Release 2.0.10

### Breaking changes
* None

### Bugs fixed
* Fixes a circular dependency in built package

### Enhancements
* None

### Internals
* None

# Release 2.0.9

### Breaking changes
* None

### Bugs fixed
* Removes "del" as a dependency, fixing startup
* Exports RealmFactory and RealmDefinition classes

### Enhancements
* None

### Internals
* Publishing releases now automatically makes a release in the public reposutory
* CHANGELOG.md is now maintained automatically from RELEASENOTES.md
* Release notes should now be updated in RELEASENOTES.md

# Release 2.0.8

### Breaking changes
* None

### Bugs fixed
* Make sync client logs less verbose (Fixes \#433)
* Render the service metadata into the message (Fixes \#233, \#250)

### Enhancements
* Information about the feature token is now logged upon startup.

### Internals
* Silences migration tests (Fixes #486)
* Fixed bug in CloudKit auth provider: https://github.com/realm/realm-object-server/issues/282
* Make releases on public repo
* Update private repository name
* New changelog workflow

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
