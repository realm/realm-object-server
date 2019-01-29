# Release 3.1.3

### Enhancements
* None

### Fixed
* Fixed a crash in the Consul client library. The crash occurs when the Consul server `ConsulDiscovery` is configured with becomes unreachable. The library will now attempt to reconnect with an incremental backoff.

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* None


# Release 3.1.2

### Enhancements
* None

### Fixed
* Fixed an oversight that would cause the `ReplicatedSyncService` to ignore some of the arguments being passed in the constructor. The following arguments were not correctly forwarded to the sync server:
  ```
  enableLogCompaction
  enableRealmStateSizeReporting
  historyCompactionInterval
  historyTtl
  shouldCompactRealmsAtStart
  shouldPerformPartialSyncAtStart
  verifyRealmsAtStart
  runPrecheckInChildProcess
  maxFilesInCache
  maxUploadBacklog
  enableDownloadBootstrapCache
  disablePartialSyncCompleter
  ```

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* None

### Internals
* None


# Release 3.1.1

### Breaking changes
* None

### Bugs fixed
* Fixed TypeScript compilation error `Interface 'ReplicatedSyncServiceConfig' incorrectly extends interface 'SyncServiceConfig'` when using ROS 3.13.0 or later which is caused by the type of the `SyncServiceConfig.logLevel` property changing from plain `string` to a union of string constants. 

### Enhancements
* None

### Internals
* None

# Release 3.1.0

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Sync server now has actual support for synchronous backup of Realm files
  taking part in partial synchronization. Until now, both reference and partial
  files were backed up **asynchronously** even though synchronous backup was
  selected for the server.
* Improved support for asynchronous backup: Reference file is now guaranteed to
  be backed up after partial files. This will eliminate a potential for
  corruption during a fail-over from the master to the backup slave.
* When the server is configured for HTTPS, its internal components
  will communicate over HTTPS in both single-node and multi-node
  deployments.

### Internals
* None

# Release 3.0.6

### Breaking changes
* None

### Bugs fixed
* ROS 3.9.4 renamed the hidden StatsdExporter class and exports it as stats.StatsdReceiver instead, this resulted in a
  "Cannot find module 'realm-object-server/dist/shared/StatsdExporter'" error being thrown upon startup.

### Enhancements
* None

### Internals
* None

# Release 3.0.5

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Expose the `secure` option on `IConsulDiscoveryConfiguration`. This switches to HTTPS communication with the Consul agent.

### Internals
* None

# Release 3.0.4

### Breaking changes
* None

### Bugs fixed
* Bumped version of the required `realm-object-server` dependency with a fix for an npm installation issue.

### Enhancements
* None

### Internals
* None

# Release 3.0.3

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* `MetricsService` is now discoverable in Consul - a Prometheus server configured for Consul service discovery will be able to discover and scrape all nodes running `MetricsService` without static configuration.
* ReplicatedSyncService will always emit sync worker stats to the server's stats sink now.

### Internals
* Update to ROS 3.6.3 and fix some npm security audit warnings by upgrading dependencies.

# Release 3.0.2

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Added the option to switch between synchronous and asynchronous backup in ReplicatedSyncService.
* Better logging for Consul service registration errors.

### Internals
* None

# Release 3.0.1

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* None

# Release 3.0.1-beta.1

### Breaking changes
* Moved Realm Object Server to a peer dependency to allow using ROS from beta/alpha channels.

### Bugs fixed
* None

### Enhancements
* None

### Internals
* None

# Release 3.0.0

### Breaking changes
* Upgrade the `realm-object-server` dependency to 3.1, which brings a breaking sync protocol change.

### Bugs fixed
* None

### Enhancements
* None

### Internals
* None

# Release 2.1.7

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* None

# Release 2.1.6

### Breaking changes
* None

### Bugs fixed
* `ReplicatedSyncService` now correctly honors `ConsulDiscovery`'s `advertiseAddress` when promoting itself to master.
  Previously it only used `advertiseAddress` when initially becoming master.
* `ReplicatedSyncService` now doesn't leave stale `spare` entries in the Consul service directory when a spare node transitions to the slave state.
* Fixed a bug where the spare `ReplicatedSyncService` instance in a cluster was not visible in Consul.

### Enhancements
* None

### Internals
* None

# Release 2.1.5

### Breaking changes
* None

### Bugs fixed
* Service Watch now correcly ends the consul watch when there are no service availability listeners.
* Fixed bug where `enableDownloadLogCompaction` and `maxDownloadSize` configs were not passed to the underlying sync service.

### Enhancements
* None

### Internals
* None

# Release 2.1.4

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* None

# Release 2.1.3

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Allow overriding the Consul advertise port of services

### Internals
* Upgraded ROS to 2.5.1

# Release 2.1.2

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* Upgraded ROS to 2.5.0

# Release 2.1.1

### Breaking changes
* Fixes a potential crash in sync failover when a spare worker is promoted.

### Bugs fixed
* None

### Enhancements
* None

### Internals
* None

# Release 2.1.0

### Breaking changes
* None

### Bugs fixed
* Now supports consul 1.0.2

### Enhancements
* Updated ROS to 2.4.2

### Internals
* Fixed and added integration tests

# Release 2.0.4

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* Added Helm chart for deployments
* Added PrometheusStatsSink and Metrics Service (not enabled by default)

# Release 2.0.3

### Breaking changes
* None

### Bugs fixed
* Enables the WelcomeService, so that HTTP GET / does not return 404.

### Enhancements
* Allows using a namespace in consul, using the CONSUL_NAMESPACE environment variable

### Internals
* None

# Release 2.0.2

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Updated to ROS 2.0.22

### Internals
* None

# Release 2.0.1

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Updated realm-object-server to version 2.0.13

### Internals
* None

## 2.0.0

Initial Release.
