export default [
  {
    args: '',
    commandName: 'ACL LOAD',
    dataGroup: 'server',
    dataName: 'acl load',
    link: '/commands/acl-load',
    summary: 'Reload the ACLs from the configured ACL file'
  },
  {
    args: '',
    commandName: 'ACL SAVE',
    dataGroup: 'server',
    dataName: 'acl save',
    link: '/commands/acl-save',
    summary: 'Save the current ACL rules in the configured ACL file'
  },
  {
    args: '',
    commandName: 'ACL LIST',
    dataGroup: 'server',
    dataName: 'acl list',
    link: '/commands/acl-list',
    summary: 'List the current ACL rules in ACL config file format'
  },
  {
    args: '',
    commandName: 'ACL USERS',
    dataGroup: 'server',
    dataName: 'acl users',
    link: '/commands/acl-users',
    summary: 'List the username of all the configured ACL rules'
  },
  {
    args: 'username',
    commandName: 'ACL GETUSER',
    dataGroup: 'server',
    dataName: 'acl getuser',
    link: '/commands/acl-getuser',
    summary: 'Get the rules for a specific ACL user'
  },
  {
    args: 'username [rule [rule ...]]',
    commandName: 'ACL SETUSER',
    dataGroup: 'server',
    dataName: 'acl setuser',
    link: '/commands/acl-setuser',
    summary: 'Modify or create the rules for a specific ACL user'
  },
  {
    args: 'username [username ...]',
    commandName: 'ACL DELUSER',
    dataGroup: 'server',
    dataName: 'acl deluser',
    link: '/commands/acl-deluser',
    summary: 'Remove the specified ACL users and the associated rules'
  },
  {
    args: '[categoryname]',
    commandName: 'ACL CAT',
    dataGroup: 'server',
    dataName: 'acl cat',
    link: '/commands/acl-cat',
    summary: 'List the ACL categories or the commands inside a category'
  },
  {
    args: '[bits]',
    commandName: 'ACL GENPASS',
    dataGroup: 'server',
    dataName: 'acl genpass',
    link: '/commands/acl-genpass',
    summary: 'Generate a pseudorandom secure password to use for ACL users'
  },
  {
    args: '',
    commandName: 'ACL WHOAMI',
    dataGroup: 'server',
    dataName: 'acl whoami',
    link: '/commands/acl-whoami',
    summary: 'Return the name of the user associated to the current connection'
  },
  {
    args: '[count or RESET]',
    commandName: 'ACL LOG',
    dataGroup: 'server',
    dataName: 'acl log',
    link: '/commands/acl-log',
    summary: 'List latest events denied because of ACLs in place'
  },
  {
    args: '',
    commandName: 'ACL HELP',
    dataGroup: 'server',
    dataName: 'acl help',
    link: '/commands/acl-help',
    summary: 'Show helpful text about the different subcommands'
  },
  {
    args: 'key value',
    commandName: 'APPEND',
    dataGroup: 'string',
    dataName: 'append',
    link: '/commands/append',
    summary: 'Append a value to a key'
  },
  {
    args: '[username] password',
    commandName: 'AUTH',
    dataGroup: 'connection',
    dataName: 'auth',
    link: '/commands/auth',
    summary: 'Authenticate to the server'
  },
  {
    args: '',
    commandName: 'BGREWRITEAOF',
    dataGroup: 'server',
    dataName: 'bgrewriteaof',
    link: '/commands/bgrewriteaof',
    summary: 'Asynchronously rewrite the append-only file'
  },
  {
    args: '[SCHEDULE]',
    commandName: 'BGSAVE',
    dataGroup: 'server',
    dataName: 'bgsave',
    link: '/commands/bgsave',
    summary: 'Asynchronously save the dataset to disk'
  },
  {
    args: 'key [start end]',
    commandName: 'BITCOUNT',
    dataGroup: 'string',
    dataName: 'bitcount',
    link: '/commands/bitcount',
    summary: 'Count set bits in a string'
  },
  {
    args: 'key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]',
    commandName: 'BITFIELD',
    dataGroup: 'string',
    dataName: 'bitfield',
    link: '/commands/bitfield',
    summary: 'Perform arbitrary bitfield integer operations on strings'
  },
  {
    args: 'operation destkey key [key ...]',
    commandName: 'BITOP',
    dataGroup: 'string',
    dataName: 'bitop',
    link: '/commands/bitop',
    summary: 'Perform bitwise operations between strings'
  },
  {
    args: 'key bit [start] [end]',
    commandName: 'BITPOS',
    dataGroup: 'string',
    dataName: 'bitpos',
    link: '/commands/bitpos',
    summary: 'Find first bit set or clear in a string'
  },
  {
    args: 'key [key ...] timeout',
    commandName: 'BLPOP',
    dataGroup: 'list',
    dataName: 'blpop',
    link: '/commands/blpop',
    summary: 'Remove and get the first element in a list, or block until one is available'
  },
  {
    args: 'key [key ...] timeout',
    commandName: 'BRPOP',
    dataGroup: 'list',
    dataName: 'brpop',
    link: '/commands/brpop',
    summary: 'Remove and get the last element in a list, or block until one is available'
  },
  {
    args: 'source destination timeout',
    commandName: 'BRPOPLPUSH',
    dataGroup: 'list',
    dataName: 'brpoplpush',
    link: '/commands/brpoplpush',
    summary: 'Pop an element from a list, push it to another list and return it; or block until one is available'
  },
  {
    args: 'source destination LEFT|RIGHT LEFT|RIGHT timeout',
    commandName: 'BLMOVE',
    dataGroup: 'list',
    dataName: 'blmove',
    link: '/commands/blmove',
    summary: 'Pop an element from a list, push it to another list and return it; or block until one is available'
  },
  {
    args: 'key [key ...] timeout',
    commandName: 'BZPOPMIN',
    dataGroup: 'sorted_set',
    dataName: 'bzpopmin',
    link: '/commands/bzpopmin',
    summary: 'Remove and return the member with the lowest score from one or more sorted sets, or block until one is available'
  },
  {
    args: 'key [key ...] timeout',
    commandName: 'BZPOPMAX',
    dataGroup: 'sorted_set',
    dataName: 'bzpopmax',
    link: '/commands/bzpopmax',
    summary: 'Remove and return the member with the highest score from one or more sorted sets, or block until one is available'
  },
  {
    args: 'YES|NO',
    commandName: 'CLIENT CACHING',
    dataGroup: 'connection',
    dataName: 'client caching',
    link: '/commands/client-caching',
    summary: 'Instruct the server about tracking or not keys in the next request'
  },
  {
    args: '',
    commandName: 'CLIENT ID',
    dataGroup: 'connection',
    dataName: 'client id',
    link: '/commands/client-id',
    summary: 'Returns the client ID for the current connection'
  },
  {
    args: '',
    commandName: 'CLIENT INFO',
    dataGroup: 'connection',
    dataName: 'client info',
    link: '/commands/client-info',
    summary: 'Returns information about the current client connection.'
  },
  {
    args: '[ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [USER username] [ADDR ip:port] [SKIPME yes/no]',
    commandName: 'CLIENT KILL',
    dataGroup: 'connection',
    dataName: 'client kill',
    link: '/commands/client-kill',
    summary: 'Kill the connection of a client'
  },
  {
    args: '[TYPE normal|master|replica|pubsub] [ID client-id [client-id ...]]',
    commandName: 'CLIENT LIST',
    dataGroup: 'connection',
    dataName: 'client list',
    link: '/commands/client-list',
    summary: 'Get the list of client connections'
  },
  {
    args: '',
    commandName: 'CLIENT GETNAME',
    dataGroup: 'connection',
    dataName: 'client getname',
    link: '/commands/client-getname',
    summary: 'Get the current connection name'
  },
  {
    args: '',
    commandName: 'CLIENT GETREDIR',
    dataGroup: 'connection',
    dataName: 'client getredir',
    link: '/commands/client-getredir',
    summary: 'Get tracking notifications redirection client ID if any'
  },
  {
    args: '',
    commandName: 'CLIENT UNPAUSE',
    dataGroup: 'connection',
    dataName: 'client unpause',
    link: '/commands/client-unpause',
    summary: 'Resume processing of clients that were paused'
  },
  {
    args: 'timeout [WRITE|ALL]',
    commandName: 'CLIENT PAUSE',
    dataGroup: 'connection',
    dataName: 'client pause',
    link: '/commands/client-pause',
    summary: 'Stop processing commands from clients for some time'
  },
  {
    args: 'ON|OFF|SKIP',
    commandName: 'CLIENT REPLY',
    dataGroup: 'connection',
    dataName: 'client reply',
    link: '/commands/client-reply',
    summary: 'Instruct the server whether to reply to commands'
  },
  {
    args: 'connection-name',
    commandName: 'CLIENT SETNAME',
    dataGroup: 'connection',
    dataName: 'client setname',
    link: '/commands/client-setname',
    summary: 'Set the current connection name'
  },
  {
    args: 'ON|OFF [REDIRECT client-id] [PREFIX prefix [PREFIX prefix ...]] [BCAST] [OPTIN] [OPTOUT] [NOLOOP]',
    commandName: 'CLIENT TRACKING',
    dataGroup: 'connection',
    dataName: 'client tracking',
    link: '/commands/client-tracking',
    summary: 'Enable or disable server assisted client side caching support'
  },
  {
    args: '',
    commandName: 'CLIENT TRACKINGINFO',
    dataGroup: 'connection',
    dataName: 'client trackinginfo',
    link: '/commands/client-trackinginfo',
    summary: 'Return information about server assisted client side caching for the current connection'
  },
  {
    args: 'client-id [TIMEOUT|ERROR]',
    commandName: 'CLIENT UNBLOCK',
    dataGroup: 'connection',
    dataName: 'client unblock',
    link: '/commands/client-unblock',
    summary: 'Unblock a client blocked in a blocking command from a different connection'
  },
  {
    args: 'slot [slot ...]',
    commandName: 'CLUSTER ADDSLOTS',
    dataGroup: 'cluster',
    dataName: 'cluster addslots',
    link: '/commands/cluster-addslots',
    summary: 'Assign new hash slots to receiving node'
  },
  {
    args: '',
    commandName: 'CLUSTER BUMPEPOCH',
    dataGroup: 'cluster',
    dataName: 'cluster bumpepoch',
    link: '/commands/cluster-bumpepoch',
    summary: 'Advance the cluster config epoch'
  },
  {
    args: 'node-id',
    commandName: 'CLUSTER COUNT-FAILURE-REPORTS',
    dataGroup: 'cluster',
    dataName: 'cluster count-failure-reports',
    link: '/commands/cluster-count-failure-reports',
    summary: 'Return the number of failure reports active for a given node'
  },
  {
    args: 'slot',
    commandName: 'CLUSTER COUNTKEYSINSLOT',
    dataGroup: 'cluster',
    dataName: 'cluster countkeysinslot',
    link: '/commands/cluster-countkeysinslot',
    summary: 'Return the number of local keys in the specified hash slot'
  },
  {
    args: 'slot [slot ...]',
    commandName: 'CLUSTER DELSLOTS',
    dataGroup: 'cluster',
    dataName: 'cluster delslots',
    link: '/commands/cluster-delslots',
    summary: 'Set hash slots as unbound in receiving node'
  },
  {
    args: '[FORCE|TAKEOVER]',
    commandName: 'CLUSTER FAILOVER',
    dataGroup: 'cluster',
    dataName: 'cluster failover',
    link: '/commands/cluster-failover',
    summary: 'Forces a replica to perform a manual failover of its master.'
  },
  {
    args: '',
    commandName: 'CLUSTER FLUSHSLOTS',
    dataGroup: 'cluster',
    dataName: 'cluster flushslots',
    link: '/commands/cluster-flushslots',
    summary: 'Delete a node\'s own slots information'
  },
  {
    args: 'node-id',
    commandName: 'CLUSTER FORGET',
    dataGroup: 'cluster',
    dataName: 'cluster forget',
    link: '/commands/cluster-forget',
    summary: 'Remove a node from the nodes table'
  },
  {
    args: 'slot count',
    commandName: 'CLUSTER GETKEYSINSLOT',
    dataGroup: 'cluster',
    dataName: 'cluster getkeysinslot',
    link: '/commands/cluster-getkeysinslot',
    summary: 'Return local key names in the specified hash slot'
  },
  {
    args: '',
    commandName: 'CLUSTER INFO',
    dataGroup: 'cluster',
    dataName: 'cluster info',
    link: '/commands/cluster-info',
    summary: 'Provides info about Redis Cluster node state'
  },
  {
    args: 'key',
    commandName: 'CLUSTER KEYSLOT',
    dataGroup: 'cluster',
    dataName: 'cluster keyslot',
    link: '/commands/cluster-keyslot',
    summary: 'Returns the hash slot of the specified key'
  },
  {
    args: 'ip port',
    commandName: 'CLUSTER MEET',
    dataGroup: 'cluster',
    dataName: 'cluster meet',
    link: '/commands/cluster-meet',
    summary: 'Force a node cluster to handshake with another node'
  },
  {
    args: '',
    commandName: 'CLUSTER MYID',
    dataGroup: 'cluster',
    dataName: 'cluster myid',
    link: '/commands/cluster-myid',
    summary: 'Return the node id'
  },
  {
    args: '',
    commandName: 'CLUSTER NODES',
    dataGroup: 'cluster',
    dataName: 'cluster nodes',
    link: '/commands/cluster-nodes',
    summary: 'Get Cluster config for the node'
  },
  {
    args: 'node-id',
    commandName: 'CLUSTER REPLICATE',
    dataGroup: 'cluster',
    dataName: 'cluster replicate',
    link: '/commands/cluster-replicate',
    summary: 'Reconfigure a node as a replica of the specified master node'
  },
  {
    args: '[HARD|SOFT]',
    commandName: 'CLUSTER RESET',
    dataGroup: 'cluster',
    dataName: 'cluster reset',
    link: '/commands/cluster-reset',
    summary: 'Reset a Redis Cluster node'
  },
  {
    args: '',
    commandName: 'CLUSTER SAVECONFIG',
    dataGroup: 'cluster',
    dataName: 'cluster saveconfig',
    link: '/commands/cluster-saveconfig',
    summary: 'Forces the node to save cluster state on disk'
  },
  {
    args: 'config-epoch',
    commandName: 'CLUSTER SET-CONFIG-EPOCH',
    dataGroup: 'cluster',
    dataName: 'cluster set-config-epoch',
    link: '/commands/cluster-set-config-epoch',
    summary: 'Set the configuration epoch in a new node'
  },
  {
    args: 'slot IMPORTING|MIGRATING|STABLE|NODE [node-id]',
    commandName: 'CLUSTER SETSLOT',
    dataGroup: 'cluster',
    dataName: 'cluster setslot',
    link: '/commands/cluster-setslot',
    summary: 'Bind a hash slot to a specific node'
  },
  {
    args: 'node-id',
    commandName: 'CLUSTER SLAVES',
    dataGroup: 'cluster',
    dataName: 'cluster slaves',
    link: '/commands/cluster-slaves',
    summary: 'List replica nodes of the specified master node'
  },
  {
    args: 'node-id',
    commandName: 'CLUSTER REPLICAS',
    dataGroup: 'cluster',
    dataName: 'cluster replicas',
    link: '/commands/cluster-replicas',
    summary: 'List replica nodes of the specified master node'
  },
  {
    args: '',
    commandName: 'CLUSTER SLOTS',
    dataGroup: 'cluster',
    dataName: 'cluster slots',
    link: '/commands/cluster-slots',
    summary: 'Get array of Cluster slot to node mappings'
  },
  {
    args: '',
    commandName: 'COMMAND',
    dataGroup: 'server',
    dataName: 'command',
    link: '/commands/command',
    summary: 'Get array of Redis command details'
  },
  {
    args: '',
    commandName: 'COMMAND COUNT',
    dataGroup: 'server',
    dataName: 'command count',
    link: '/commands/command-count',
    summary: 'Get total number of Redis commands'
  },
  {
    args: '',
    commandName: 'COMMAND GETKEYS',
    dataGroup: 'server',
    dataName: 'command getkeys',
    link: '/commands/command-getkeys',
    summary: 'Extract keys given a full Redis command'
  },
  {
    args: 'command-name [command-name ...]',
    commandName: 'COMMAND INFO',
    dataGroup: 'server',
    dataName: 'command info',
    link: '/commands/command-info',
    summary: 'Get array of specific Redis command details'
  },
  {
    args: 'parameter',
    commandName: 'CONFIG GET',
    dataGroup: 'server',
    dataName: 'config get',
    link: '/commands/config-get',
    summary: 'Get the value of a configuration parameter'
  },
  {
    args: '',
    commandName: 'CONFIG REWRITE',
    dataGroup: 'server',
    dataName: 'config rewrite',
    link: '/commands/config-rewrite',
    summary: 'Rewrite the configuration file with the in memory configuration'
  },
  {
    args: 'parameter value',
    commandName: 'CONFIG SET',
    dataGroup: 'server',
    dataName: 'config set',
    link: '/commands/config-set',
    summary: 'Set a configuration parameter to the given value'
  },
  {
    args: '',
    commandName: 'CONFIG RESETSTAT',
    dataGroup: 'server',
    dataName: 'config resetstat',
    link: '/commands/config-resetstat',
    summary: 'Reset the stats returned by INFO'
  },
  {
    args: 'source destination [DB destination-db] [REPLACE]',
    commandName: 'COPY',
    dataGroup: 'generic',
    dataName: 'copy',
    link: '/commands/copy',
    summary: 'Copy a key'
  },
  {
    args: '',
    commandName: 'DBSIZE',
    dataGroup: 'server',
    dataName: 'dbsize',
    link: '/commands/dbsize',
    summary: 'Return the number of keys in the selected database'
  },
  {
    args: 'key',
    commandName: 'DEBUG OBJECT',
    dataGroup: 'server',
    dataName: 'debug object',
    link: '/commands/debug-object',
    summary: 'Get debugging information about a key'
  },
  {
    args: '',
    commandName: 'DEBUG SEGFAULT',
    dataGroup: 'server',
    dataName: 'debug segfault',
    link: '/commands/debug-segfault',
    summary: 'Make the server crash'
  },
  {
    args: 'key',
    commandName: 'DECR',
    dataGroup: 'string',
    dataName: 'decr',
    link: '/commands/decr',
    summary: 'Decrement the integer value of a key by one'
  },
  {
    args: 'key decrement',
    commandName: 'DECRBY',
    dataGroup: 'string',
    dataName: 'decrby',
    link: '/commands/decrby',
    summary: 'Decrement the integer value of a key by the given number'
  },
  {
    args: 'key [key ...]',
    commandName: 'DEL',
    dataGroup: 'generic',
    dataName: 'del',
    link: '/commands/del',
    summary: 'Delete a key'
  },
  {
    args: '',
    commandName: 'DISCARD',
    dataGroup: 'transactions',
    dataName: 'discard',
    link: '/commands/discard',
    summary: 'Discard all commands issued after MULTI'
  },
  {
    args: 'key',
    commandName: 'DUMP',
    dataGroup: 'generic',
    dataName: 'dump',
    link: '/commands/dump',
    summary: 'Return a serialized version of the value stored at the specified key.'
  },
  {
    args: 'message',
    commandName: 'ECHO',
    dataGroup: 'connection',
    dataName: 'echo',
    link: '/commands/echo',
    summary: 'Echo the given string'
  },
  {
    args: 'script numkeys key [key ...] arg [arg ...]',
    commandName: 'EVAL',
    dataGroup: 'scripting',
    dataName: 'eval',
    link: '/commands/eval',
    summary: 'Execute a Lua script server side'
  },
  {
    args: 'sha1 numkeys key [key ...] arg [arg ...]',
    commandName: 'EVALSHA',
    dataGroup: 'scripting',
    dataName: 'evalsha',
    link: '/commands/evalsha',
    summary: 'Execute a Lua script server side'
  },
  {
    args: '',
    commandName: 'EXEC',
    dataGroup: 'transactions',
    dataName: 'exec',
    link: '/commands/exec',
    summary: 'Execute all commands issued after MULTI'
  },
  {
    args: 'key [key ...]',
    commandName: 'EXISTS',
    dataGroup: 'generic',
    dataName: 'exists',
    link: '/commands/exists',
    summary: 'Determine if a key exists'
  },
  {
    args: 'key seconds',
    commandName: 'EXPIRE',
    dataGroup: 'generic',
    dataName: 'expire',
    link: '/commands/expire',
    summary: 'Set a key\'s time to live in seconds'
  },
  {
    args: 'key timestamp',
    commandName: 'EXPIREAT',
    dataGroup: 'generic',
    dataName: 'expireat',
    link: '/commands/expireat',
    summary: 'Set the expiration for a key as a UNIX timestamp'
  },
  {
    args: '[TO host port [FORCE]] [ABORT] [TIMEOUT milliseconds]',
    commandName: 'FAILOVER',
    dataGroup: 'server',
    dataName: 'failover',
    link: '/commands/failover',
    summary: 'Start a coordinated failover between this server and one of its replicas.'
  },
  {
    args: '[ASYNC|SYNC]',
    commandName: 'FLUSHALL',
    dataGroup: 'server',
    dataName: 'flushall',
    link: '/commands/flushall',
    summary: 'Remove all keys from all databases'
  },
  {
    args: '[ASYNC|SYNC]',
    commandName: 'FLUSHDB',
    dataGroup: 'server',
    dataName: 'flushdb',
    link: '/commands/flushdb',
    summary: 'Remove all keys from the current database'
  },
  {
    args: 'key [NX|XX] [CH] longitude latitude member [longitude latitude member ...]',
    commandName: 'GEOADD',
    dataGroup: 'geo',
    dataName: 'geoadd',
    link: '/commands/geoadd',
    summary: 'Add one or more geospatial items in the geospatial index represented using a sorted set'
  },
  {
    args: 'key member [member ...]',
    commandName: 'GEOHASH',
    dataGroup: 'geo',
    dataName: 'geohash',
    link: '/commands/geohash',
    summary: 'Returns members of a geospatial index as standard geohash strings'
  },
  {
    args: 'key member [member ...]',
    commandName: 'GEOPOS',
    dataGroup: 'geo',
    dataName: 'geopos',
    link: '/commands/geopos',
    summary: 'Returns longitude and latitude of members of a geospatial index'
  },
  {
    args: 'key member1 member2 [m|km|ft|mi]',
    commandName: 'GEODIST',
    dataGroup: 'geo',
    dataName: 'geodist',
    link: '/commands/geodist',
    summary: 'Returns the distance between two members of a geospatial index'
  },
  {
    args: 'key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count [ANY]] [ASC|DESC] [STORE key] [STOREDIST key]',
    commandName: 'GEORADIUS',
    dataGroup: 'geo',
    dataName: 'georadius',
    link: '/commands/georadius',
    summary: 'Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point'
  },
  {
    args: 'key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count [ANY]] [ASC|DESC] [STORE key] [STOREDIST key]',
    commandName: 'GEORADIUSBYMEMBER',
    dataGroup: 'geo',
    dataName: 'georadiusbymember',
    link: '/commands/georadiusbymember',
    summary: 'Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member'
  },
  {
    args: 'key [FROMMEMBER member] [FROMLONLAT longitude latitude] [BYRADIUS radius m|km|ft|mi] [BYBOX width height m|km|ft|mi] [ASC|DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST] [WITHHASH]',
    commandName: 'GEOSEARCH',
    dataGroup: 'geo',
    dataName: 'geosearch',
    link: '/commands/geosearch',
    summary: 'Query a sorted set representing a geospatial index to fetch members inside an area of a box or a circle.'
  },
  {
    args: 'destination source [FROMMEMBER member] [FROMLONLAT longitude latitude] [BYRADIUS radius m|km|ft|mi] [BYBOX width height m|km|ft|mi] [ASC|DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST] [WITHHASH] [STOREDIST]',
    commandName: 'GEOSEARCHSTORE',
    dataGroup: 'geo',
    dataName: 'geosearchstore',
    link: '/commands/geosearchstore',
    summary: 'Query a sorted set representing a geospatial index to fetch members inside an area of a box or a circle, and store the result in another key.'
  },
  {
    args: 'key',
    commandName: 'GET',
    dataGroup: 'string',
    dataName: 'get',
    link: '/commands/get',
    summary: 'Get the value of a key'
  },
  {
    args: 'key offset',
    commandName: 'GETBIT',
    dataGroup: 'string',
    dataName: 'getbit',
    link: '/commands/getbit',
    summary: 'Returns the bit value at offset in the string value stored at key'
  },
  {
    args: 'key',
    commandName: 'GETDEL',
    dataGroup: 'string',
    dataName: 'getdel',
    link: '/commands/getdel',
    summary: 'Get the value of a key and delete the key'
  },
  {
    args: 'key [EX seconds|PX milliseconds|EXAT timestamp|PXAT milliseconds-timestamp|PERSIST]',
    commandName: 'GETEX',
    dataGroup: 'string',
    dataName: 'getex',
    link: '/commands/getex',
    summary: 'Get the value of a key and optionally set its expiration'
  },
  {
    args: 'key start end',
    commandName: 'GETRANGE',
    dataGroup: 'string',
    dataName: 'getrange',
    link: '/commands/getrange',
    summary: 'Get a substring of the string stored at a key'
  },
  {
    args: 'key value',
    commandName: 'GETSET',
    dataGroup: 'string',
    dataName: 'getset',
    link: '/commands/getset',
    summary: 'Set the string value of a key and return its old value'
  },
  {
    args: 'key field [field ...]',
    commandName: 'HDEL',
    dataGroup: 'hash',
    dataName: 'hdel',
    link: '/commands/hdel',
    summary: 'Delete one or more hash fields'
  },
  {
    args: '[protover [AUTH username password] [SETNAME clientname]]',
    commandName: 'HELLO',
    dataGroup: 'connection',
    dataName: 'hello',
    link: '/commands/hello',
    summary: 'Handshake with Redis'
  },
  {
    args: 'key field',
    commandName: 'HEXISTS',
    dataGroup: 'hash',
    dataName: 'hexists',
    link: '/commands/hexists',
    summary: 'Determine if a hash field exists'
  },
  {
    args: 'key field',
    commandName: 'HGET',
    dataGroup: 'hash',
    dataName: 'hget',
    link: '/commands/hget',
    summary: 'Get the value of a hash field'
  },
  {
    args: 'key',
    commandName: 'HGETALL',
    dataGroup: 'hash',
    dataName: 'hgetall',
    link: '/commands/hgetall',
    summary: 'Get all the fields and values in a hash'
  },
  {
    args: 'key field increment',
    commandName: 'HINCRBY',
    dataGroup: 'hash',
    dataName: 'hincrby',
    link: '/commands/hincrby',
    summary: 'Increment the integer value of a hash field by the given number'
  },
  {
    args: 'key field increment',
    commandName: 'HINCRBYFLOAT',
    dataGroup: 'hash',
    dataName: 'hincrbyfloat',
    link: '/commands/hincrbyfloat',
    summary: 'Increment the float value of a hash field by the given amount'
  },
  {
    args: 'key',
    commandName: 'HKEYS',
    dataGroup: 'hash',
    dataName: 'hkeys',
    link: '/commands/hkeys',
    summary: 'Get all the fields in a hash'
  },
  {
    args: 'key',
    commandName: 'HLEN',
    dataGroup: 'hash',
    dataName: 'hlen',
    link: '/commands/hlen',
    summary: 'Get the number of fields in a hash'
  },
  {
    args: 'key field [field ...]',
    commandName: 'HMGET',
    dataGroup: 'hash',
    dataName: 'hmget',
    link: '/commands/hmget',
    summary: 'Get the values of all the given hash fields'
  },
  {
    args: 'key field value [field value ...]',
    commandName: 'HMSET',
    dataGroup: 'hash',
    dataName: 'hmset',
    link: '/commands/hmset',
    summary: 'Set multiple hash fields to multiple values'
  },
  {
    args: 'key field value [field value ...]',
    commandName: 'HSET',
    dataGroup: 'hash',
    dataName: 'hset',
    link: '/commands/hset',
    summary: 'Set the string value of a hash field'
  },
  {
    args: 'key field value',
    commandName: 'HSETNX',
    dataGroup: 'hash',
    dataName: 'hsetnx',
    link: '/commands/hsetnx',
    summary: 'Set the value of a hash field, only if the field does not exist'
  },
  {
    args: 'key [count [WITHVALUES]]',
    commandName: 'HRANDFIELD',
    dataGroup: 'hash',
    dataName: 'hrandfield',
    link: '/commands/hrandfield',
    summary: 'Get one or multiple random fields from a hash'
  },
  {
    args: 'key field',
    commandName: 'HSTRLEN',
    dataGroup: 'hash',
    dataName: 'hstrlen',
    link: '/commands/hstrlen',
    summary: 'Get the length of the value of a hash field'
  },
  {
    args: 'key',
    commandName: 'HVALS',
    dataGroup: 'hash',
    dataName: 'hvals',
    link: '/commands/hvals',
    summary: 'Get all the values in a hash'
  },
  {
    args: 'key',
    commandName: 'INCR',
    dataGroup: 'string',
    dataName: 'incr',
    link: '/commands/incr',
    summary: 'Increment the integer value of a key by one'
  },
  {
    args: 'key increment',
    commandName: 'INCRBY',
    dataGroup: 'string',
    dataName: 'incrby',
    link: '/commands/incrby',
    summary: 'Increment the integer value of a key by the given amount'
  },
  {
    args: 'key increment',
    commandName: 'INCRBYFLOAT',
    dataGroup: 'string',
    dataName: 'incrbyfloat',
    link: '/commands/incrbyfloat',
    summary: 'Increment the float value of a key by the given amount'
  },
  {
    args: '[section]',
    commandName: 'INFO',
    dataGroup: 'server',
    dataName: 'info',
    link: '/commands/info',
    summary: 'Get information and statistics about the server'
  },
  {
    args: '[VERSION version]',
    commandName: 'LOLWUT',
    dataGroup: 'server',
    dataName: 'lolwut',
    link: '/commands/lolwut',
    summary: 'Display some computer art and the Redis version'
  },
  {
    args: 'pattern',
    commandName: 'KEYS',
    dataGroup: 'generic',
    dataName: 'keys',
    link: '/commands/keys',
    summary: 'Find all keys matching the given pattern'
  },
  {
    args: '',
    commandName: 'LASTSAVE',
    dataGroup: 'server',
    dataName: 'lastsave',
    link: '/commands/lastsave',
    summary: 'Get the UNIX time stamp of the last successful save to disk'
  },
  {
    args: 'key index',
    commandName: 'LINDEX',
    dataGroup: 'list',
    dataName: 'lindex',
    link: '/commands/lindex',
    summary: 'Get an element from a list by its index'
  },
  {
    args: 'key BEFORE|AFTER pivot element',
    commandName: 'LINSERT',
    dataGroup: 'list',
    dataName: 'linsert',
    link: '/commands/linsert',
    summary: 'Insert an element before or after another element in a list'
  },
  {
    args: 'key',
    commandName: 'LLEN',
    dataGroup: 'list',
    dataName: 'llen',
    link: '/commands/llen',
    summary: 'Get the length of a list'
  },
  {
    args: 'key [count]',
    commandName: 'LPOP',
    dataGroup: 'list',
    dataName: 'lpop',
    link: '/commands/lpop',
    summary: 'Remove and get the first elements in a list'
  },
  {
    args: 'key element [RANK rank] [COUNT num-matches] [MAXLEN len]',
    commandName: 'LPOS',
    dataGroup: 'list',
    dataName: 'lpos',
    link: '/commands/lpos',
    summary: 'Return the index of matching elements on a list'
  },
  {
    args: 'key element [element ...]',
    commandName: 'LPUSH',
    dataGroup: 'list',
    dataName: 'lpush',
    link: '/commands/lpush',
    summary: 'Prepend one or multiple elements to a list'
  },
  {
    args: 'key element [element ...]',
    commandName: 'LPUSHX',
    dataGroup: 'list',
    dataName: 'lpushx',
    link: '/commands/lpushx',
    summary: 'Prepend an element to a list, only if the list exists'
  },
  {
    args: 'key start stop',
    commandName: 'LRANGE',
    dataGroup: 'list',
    dataName: 'lrange',
    link: '/commands/lrange',
    summary: 'Get a range of elements from a list'
  },
  {
    args: 'key count element',
    commandName: 'LREM',
    dataGroup: 'list',
    dataName: 'lrem',
    link: '/commands/lrem',
    summary: 'Remove elements from a list'
  },
  {
    args: 'key index element',
    commandName: 'LSET',
    dataGroup: 'list',
    dataName: 'lset',
    link: '/commands/lset',
    summary: 'Set the value of an element in a list by its index'
  },
  {
    args: 'key start stop',
    commandName: 'LTRIM',
    dataGroup: 'list',
    dataName: 'ltrim',
    link: '/commands/ltrim',
    summary: 'Trim a list to the specified range'
  },
  {
    args: '',
    commandName: 'MEMORY DOCTOR',
    dataGroup: 'server',
    dataName: 'memory doctor',
    link: '/commands/memory-doctor',
    summary: 'Outputs memory problems report'
  },
  {
    args: '',
    commandName: 'MEMORY HELP',
    dataGroup: 'server',
    dataName: 'memory help',
    link: '/commands/memory-help',
    summary: 'Show helpful text about the different subcommands'
  },
  {
    args: '',
    commandName: 'MEMORY MALLOC-STATS',
    dataGroup: 'server',
    dataName: 'memory malloc-stats',
    link: '/commands/memory-malloc-stats',
    summary: 'Show allocator internal stats'
  },
  {
    args: '',
    commandName: 'MEMORY PURGE',
    dataGroup: 'server',
    dataName: 'memory purge',
    link: '/commands/memory-purge',
    summary: 'Ask the allocator to release memory'
  },
  {
    args: '',
    commandName: 'MEMORY STATS',
    dataGroup: 'server',
    dataName: 'memory stats',
    link: '/commands/memory-stats',
    summary: 'Show memory usage details'
  },
  {
    args: 'key [SAMPLES count]',
    commandName: 'MEMORY USAGE',
    dataGroup: 'server',
    dataName: 'memory usage',
    link: '/commands/memory-usage',
    summary: 'Estimate the memory usage of a key'
  },
  {
    args: 'key [key ...]',
    commandName: 'MGET',
    dataGroup: 'string',
    dataName: 'mget',
    link: '/commands/mget',
    summary: 'Get the values of all the given keys'
  },
  {
    args: 'host port key|\'\' destination-db timeout [COPY] [REPLACE] [AUTH password] [AUTH2 username password] [KEYS key [key ...]]',
    commandName: 'MIGRATE',
    dataGroup: 'generic',
    dataName: 'migrate',
    link: '/commands/migrate',
    summary: 'Atomically transfer a key from a Redis instance to another one.'
  },
  {
    args: '',
    commandName: 'MODULE LIST',
    dataGroup: 'server',
    dataName: 'module list',
    link: '/commands/module-list',
    summary: 'List all modules loaded by the server'
  },
  {
    args: 'path [ arg [arg ...]]',
    commandName: 'MODULE LOAD',
    dataGroup: 'server',
    dataName: 'module load',
    link: '/commands/module-load',
    summary: 'Load a module'
  },
  {
    args: 'name',
    commandName: 'MODULE UNLOAD',
    dataGroup: 'server',
    dataName: 'module unload',
    link: '/commands/module-unload',
    summary: 'Unload a module'
  },
  {
    args: '',
    commandName: 'MONITOR',
    dataGroup: 'server',
    dataName: 'monitor',
    link: '/commands/monitor',
    summary: 'Listen for all requests received by the server in real time'
  },
  {
    args: 'key db',
    commandName: 'MOVE',
    dataGroup: 'generic',
    dataName: 'move',
    link: '/commands/move',
    summary: 'Move a key to another database'
  },
  {
    args: 'key value [key value ...]',
    commandName: 'MSET',
    dataGroup: 'string',
    dataName: 'mset',
    link: '/commands/mset',
    summary: 'Set multiple keys to multiple values'
  },
  {
    args: 'key value [key value ...]',
    commandName: 'MSETNX',
    dataGroup: 'string',
    dataName: 'msetnx',
    link: '/commands/msetnx',
    summary: 'Set multiple keys to multiple values, only if none of the keys exist'
  },
  {
    args: '',
    commandName: 'MULTI',
    dataGroup: 'transactions',
    dataName: 'multi',
    link: '/commands/multi',
    summary: 'Mark the start of a transaction block'
  },
  {
    args: 'subcommand [arguments [arguments ...]]',
    commandName: 'OBJECT',
    dataGroup: 'generic',
    dataName: 'object',
    link: '/commands/object',
    summary: 'Inspect the internals of Redis objects'
  },
  {
    args: 'key',
    commandName: 'PERSIST',
    dataGroup: 'generic',
    dataName: 'persist',
    link: '/commands/persist',
    summary: 'Remove the expiration from a key'
  },
  {
    args: 'key milliseconds',
    commandName: 'PEXPIRE',
    dataGroup: 'generic',
    dataName: 'pexpire',
    link: '/commands/pexpire',
    summary: 'Set a key\'s time to live in milliseconds'
  },
  {
    args: 'key milliseconds-timestamp',
    commandName: 'PEXPIREAT',
    dataGroup: 'generic',
    dataName: 'pexpireat',
    link: '/commands/pexpireat',
    summary: 'Set the expiration for a key as a UNIX timestamp specified in milliseconds'
  },
  {
    args: 'key element [element ...]',
    commandName: 'PFADD',
    dataGroup: 'hyperloglog',
    dataName: 'pfadd',
    link: '/commands/pfadd',
    summary: 'Adds the specified elements to the specified HyperLogLog.'
  },
  {
    args: 'key [key ...]',
    commandName: 'PFCOUNT',
    dataGroup: 'hyperloglog',
    dataName: 'pfcount',
    link: '/commands/pfcount',
    summary: 'Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).'
  },
  {
    args: 'destkey sourcekey [sourcekey ...]',
    commandName: 'PFMERGE',
    dataGroup: 'hyperloglog',
    dataName: 'pfmerge',
    link: '/commands/pfmerge',
    summary: 'Merge N different HyperLogLogs into a single one.'
  },
  {
    args: '[message]',
    commandName: 'PING',
    dataGroup: 'connection',
    dataName: 'ping',
    link: '/commands/ping',
    summary: 'Ping the server'
  },
  {
    args: 'key milliseconds value',
    commandName: 'PSETEX',
    dataGroup: 'string',
    dataName: 'psetex',
    link: '/commands/psetex',
    summary: 'Set the value and expiration in milliseconds of a key'
  },
  {
    args: 'pattern [pattern ...]',
    commandName: 'PSUBSCRIBE',
    dataGroup: 'pubsub',
    dataName: 'psubscribe',
    link: '/commands/psubscribe',
    summary: 'Listen for messages published to channels matching the given patterns'
  },
  {
    args: 'subcommand [argument [argument ...]]',
    commandName: 'PUBSUB',
    dataGroup: 'pubsub',
    dataName: 'pubsub',
    link: '/commands/pubsub',
    summary: 'Inspect the state of the Pub/Sub subsystem'
  },
  {
    args: 'key',
    commandName: 'PTTL',
    dataGroup: 'generic',
    dataName: 'pttl',
    link: '/commands/pttl',
    summary: 'Get the time to live for a key in milliseconds'
  },
  {
    args: 'channel message',
    commandName: 'PUBLISH',
    dataGroup: 'pubsub',
    dataName: 'publish',
    link: '/commands/publish',
    summary: 'Post a message to a channel'
  },
  {
    args: '[pattern [pattern ...]]',
    commandName: 'PUNSUBSCRIBE',
    dataGroup: 'pubsub',
    dataName: 'punsubscribe',
    link: '/commands/punsubscribe',
    summary: 'Stop listening for messages posted to channels matching the given patterns'
  },
  {
    args: '',
    commandName: 'QUIT',
    dataGroup: 'connection',
    dataName: 'quit',
    link: '/commands/quit',
    summary: 'Close the connection'
  },
  {
    args: '',
    commandName: 'RANDOMKEY',
    dataGroup: 'generic',
    dataName: 'randomkey',
    link: '/commands/randomkey',
    summary: 'Return a random key from the keyspace'
  },
  {
    args: '',
    commandName: 'READONLY',
    dataGroup: 'cluster',
    dataName: 'readonly',
    link: '/commands/readonly',
    summary: 'Enables read queries for a connection to a cluster replica node'
  },
  {
    args: '',
    commandName: 'READWRITE',
    dataGroup: 'cluster',
    dataName: 'readwrite',
    link: '/commands/readwrite',
    summary: 'Disables read queries for a connection to a cluster replica node'
  },
  {
    args: 'key newkey',
    commandName: 'RENAME',
    dataGroup: 'generic',
    dataName: 'rename',
    link: '/commands/rename',
    summary: 'Rename a key'
  },
  {
    args: 'key newkey',
    commandName: 'RENAMENX',
    dataGroup: 'generic',
    dataName: 'renamenx',
    link: '/commands/renamenx',
    summary: 'Rename a key, only if the new key does not exist'
  },
  {
    args: '',
    commandName: 'RESET',
    dataGroup: 'connection',
    dataName: 'reset',
    link: '/commands/reset',
    summary: 'Reset the connection'
  },
  {
    args: 'key ttl serialized-value [REPLACE] [ABSTTL] [IDLETIME seconds] [FREQ frequency]',
    commandName: 'RESTORE',
    dataGroup: 'generic',
    dataName: 'restore',
    link: '/commands/restore',
    summary: 'Create a key using the provided serialized value, previously obtained using DUMP.'
  },
  {
    args: '',
    commandName: 'ROLE',
    dataGroup: 'server',
    dataName: 'role',
    link: '/commands/role',
    summary: 'Return the role of the instance in the context of replication'
  },
  {
    args: 'key [count]',
    commandName: 'RPOP',
    dataGroup: 'list',
    dataName: 'rpop',
    link: '/commands/rpop',
    summary: 'Remove and get the last elements in a list'
  },
  {
    args: 'source destination',
    commandName: 'RPOPLPUSH',
    dataGroup: 'list',
    dataName: 'rpoplpush',
    link: '/commands/rpoplpush',
    summary: 'Remove the last element in a list, prepend it to another list and return it'
  },
  {
    args: 'source destination LEFT|RIGHT LEFT|RIGHT',
    commandName: 'LMOVE',
    dataGroup: 'list',
    dataName: 'lmove',
    link: '/commands/lmove',
    summary: 'Pop an element from a list, push it to another list and return it'
  },
  {
    args: 'key element [element ...]',
    commandName: 'RPUSH',
    dataGroup: 'list',
    dataName: 'rpush',
    link: '/commands/rpush',
    summary: 'Append one or multiple elements to a list'
  },
  {
    args: 'key element [element ...]',
    commandName: 'RPUSHX',
    dataGroup: 'list',
    dataName: 'rpushx',
    link: '/commands/rpushx',
    summary: 'Append an element to a list, only if the list exists'
  },
  {
    args: 'key member [member ...]',
    commandName: 'SADD',
    dataGroup: 'set',
    dataName: 'sadd',
    link: '/commands/sadd',
    summary: 'Add one or more members to a set'
  },
  {
    args: '',
    commandName: 'SAVE',
    dataGroup: 'server',
    dataName: 'save',
    link: '/commands/save',
    summary: 'Synchronously save the dataset to disk'
  },
  {
    args: 'key',
    commandName: 'SCARD',
    dataGroup: 'set',
    dataName: 'scard',
    link: '/commands/scard',
    summary: 'Get the number of members in a set'
  },
  {
    args: 'YES|SYNC|NO',
    commandName: 'SCRIPT DEBUG',
    dataGroup: 'scripting',
    dataName: 'script debug',
    link: '/commands/script-debug',
    summary: 'Set the debug mode for executed scripts.'
  },
  {
    args: 'sha1 [sha1 ...]',
    commandName: 'SCRIPT EXISTS',
    dataGroup: 'scripting',
    dataName: 'script exists',
    link: '/commands/script-exists',
    summary: 'Check existence of scripts in the script cache.'
  },
  {
    args: '[ASYNC|SYNC]',
    commandName: 'SCRIPT FLUSH',
    dataGroup: 'scripting',
    dataName: 'script flush',
    link: '/commands/script-flush',
    summary: 'Remove all the scripts from the script cache.'
  },
  {
    args: '',
    commandName: 'SCRIPT KILL',
    dataGroup: 'scripting',
    dataName: 'script kill',
    link: '/commands/script-kill',
    summary: 'Kill the script currently in execution.'
  },
  {
    args: 'script',
    commandName: 'SCRIPT LOAD',
    dataGroup: 'scripting',
    dataName: 'script load',
    link: '/commands/script-load',
    summary: 'Load the specified Lua script into the script cache.'
  },
  {
    args: 'key [key ...]',
    commandName: 'SDIFF',
    dataGroup: 'set',
    dataName: 'sdiff',
    link: '/commands/sdiff',
    summary: 'Subtract multiple sets'
  },
  {
    args: 'destination key [key ...]',
    commandName: 'SDIFFSTORE',
    dataGroup: 'set',
    dataName: 'sdiffstore',
    link: '/commands/sdiffstore',
    summary: 'Subtract multiple sets and store the resulting set in a key'
  },
  {
    args: 'index',
    commandName: 'SELECT',
    dataGroup: 'connection',
    dataName: 'select',
    link: '/commands/select',
    summary: 'Change the selected database for the current connection'
  },
  {
    args: 'key value [EX seconds|PX milliseconds|EXAT timestamp|PXAT milliseconds-timestamp|KEEPTTL] [NX|XX] [GET]',
    commandName: 'SET',
    dataGroup: 'string',
    dataName: 'set',
    link: '/commands/set',
    summary: 'Set the string value of a key'
  },
  {
    args: 'key offset value',
    commandName: 'SETBIT',
    dataGroup: 'string',
    dataName: 'setbit',
    link: '/commands/setbit',
    summary: 'Sets or clears the bit at offset in the string value stored at key'
  },
  {
    args: 'key seconds value',
    commandName: 'SETEX',
    dataGroup: 'string',
    dataName: 'setex',
    link: '/commands/setex',
    summary: 'Set the value and expiration of a key'
  },
  {
    args: 'key value',
    commandName: 'SETNX',
    dataGroup: 'string',
    dataName: 'setnx',
    link: '/commands/setnx',
    summary: 'Set the value of a key, only if the key does not exist'
  },
  {
    args: 'key offset value',
    commandName: 'SETRANGE',
    dataGroup: 'string',
    dataName: 'setrange',
    link: '/commands/setrange',
    summary: 'Overwrite part of a string at key starting at the specified offset'
  },
  {
    args: '[NOSAVE|SAVE]',
    commandName: 'SHUTDOWN',
    dataGroup: 'server',
    dataName: 'shutdown',
    link: '/commands/shutdown',
    summary: 'Synchronously save the dataset to disk and then shut down the server'
  },
  {
    args: 'key [key ...]',
    commandName: 'SINTER',
    dataGroup: 'set',
    dataName: 'sinter',
    link: '/commands/sinter',
    summary: 'Intersect multiple sets'
  },
  {
    args: 'destination key [key ...]',
    commandName: 'SINTERSTORE',
    dataGroup: 'set',
    dataName: 'sinterstore',
    link: '/commands/sinterstore',
    summary: 'Intersect multiple sets and store the resulting set in a key'
  },
  {
    args: 'key member',
    commandName: 'SISMEMBER',
    dataGroup: 'set',
    dataName: 'sismember',
    link: '/commands/sismember',
    summary: 'Determine if a given value is a member of a set'
  },
  {
    args: 'key member [member ...]',
    commandName: 'SMISMEMBER',
    dataGroup: 'set',
    dataName: 'smismember',
    link: '/commands/smismember',
    summary: 'Returns the membership associated with the given elements for a set'
  },
  {
    args: 'host port',
    commandName: 'SLAVEOF',
    dataGroup: 'server',
    dataName: 'slaveof',
    link: '/commands/slaveof',
    summary: 'Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.'
  },
  {
    args: 'host port',
    commandName: 'REPLICAOF',
    dataGroup: 'server',
    dataName: 'replicaof',
    link: '/commands/replicaof',
    summary: 'Make the server a replica of another instance, or promote it as master.'
  },
  {
    args: 'subcommand [argument]',
    commandName: 'SLOWLOG',
    dataGroup: 'server',
    dataName: 'slowlog',
    link: '/commands/slowlog',
    summary: 'Manages the Redis slow queries log'
  },
  {
    args: 'key',
    commandName: 'SMEMBERS',
    dataGroup: 'set',
    dataName: 'smembers',
    link: '/commands/smembers',
    summary: 'Get all the members in a set'
  },
  {
    args: 'source destination member',
    commandName: 'SMOVE',
    dataGroup: 'set',
    dataName: 'smove',
    link: '/commands/smove',
    summary: 'Move a member from one set to another'
  },
  {
    args: 'key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]',
    commandName: 'SORT',
    dataGroup: 'generic',
    dataName: 'sort',
    link: '/commands/sort',
    summary: 'Sort the elements in a list, set or sorted set'
  },
  {
    args: 'key [count]',
    commandName: 'SPOP',
    dataGroup: 'set',
    dataName: 'spop',
    link: '/commands/spop',
    summary: 'Remove and return one or multiple random members from a set'
  },
  {
    args: 'key [count]',
    commandName: 'SRANDMEMBER',
    dataGroup: 'set',
    dataName: 'srandmember',
    link: '/commands/srandmember',
    summary: 'Get one or multiple random members from a set'
  },
  {
    args: 'key member [member ...]',
    commandName: 'SREM',
    dataGroup: 'set',
    dataName: 'srem',
    link: '/commands/srem',
    summary: 'Remove one or more members from a set'
  },
  {
    args: 'LCS algo-specific-argument [algo-specific-argument ...]',
    commandName: 'STRALGO',
    dataGroup: 'string',
    dataName: 'stralgo',
    link: '/commands/stralgo',
    summary: 'Run algorithms (currently LCS) against strings'
  },
  {
    args: 'key',
    commandName: 'STRLEN',
    dataGroup: 'string',
    dataName: 'strlen',
    link: '/commands/strlen',
    summary: 'Get the length of the value stored in a key'
  },
  {
    args: 'channel [channel ...]',
    commandName: 'SUBSCRIBE',
    dataGroup: 'pubsub',
    dataName: 'subscribe',
    link: '/commands/subscribe',
    summary: 'Listen for messages published to the given channels'
  },
  {
    args: 'key [key ...]',
    commandName: 'SUNION',
    dataGroup: 'set',
    dataName: 'sunion',
    link: '/commands/sunion',
    summary: 'Add multiple sets'
  },
  {
    args: 'destination key [key ...]',
    commandName: 'SUNIONSTORE',
    dataGroup: 'set',
    dataName: 'sunionstore',
    link: '/commands/sunionstore',
    summary: 'Add multiple sets and store the resulting set in a key'
  },
  {
    args: 'index1 index2',
    commandName: 'SWAPDB',
    dataGroup: 'server',
    dataName: 'swapdb',
    link: '/commands/swapdb',
    summary: 'Swaps two Redis databases'
  },
  {
    args: '',
    commandName: 'SYNC',
    dataGroup: 'server',
    dataName: 'sync',
    link: '/commands/sync',
    summary: 'Internal command used for replication'
  },
  {
    args: 'replicationid offset',
    commandName: 'PSYNC',
    dataGroup: 'server',
    dataName: 'psync',
    link: '/commands/psync',
    summary: 'Internal command used for replication'
  },
  {
    args: '',
    commandName: 'TIME',
    dataGroup: 'server',
    dataName: 'time',
    link: '/commands/time',
    summary: 'Return the current server time'
  },
  {
    args: 'key [key ...]',
    commandName: 'TOUCH',
    dataGroup: 'generic',
    dataName: 'touch',
    link: '/commands/touch',
    summary: 'Alters the last access time of a key(s). Returns the number of existing keys specified.'
  },
  {
    args: 'key',
    commandName: 'TTL',
    dataGroup: 'generic',
    dataName: 'ttl',
    link: '/commands/ttl',
    summary: 'Get the time to live for a key'
  },
  {
    args: 'key',
    commandName: 'TYPE',
    dataGroup: 'generic',
    dataName: 'type',
    link: '/commands/type',
    summary: 'Determine the type stored at key'
  },
  {
    args: '[channel [channel ...]]',
    commandName: 'UNSUBSCRIBE',
    dataGroup: 'pubsub',
    dataName: 'unsubscribe',
    link: '/commands/unsubscribe',
    summary: 'Stop listening for messages posted to the given channels'
  },
  {
    args: 'key [key ...]',
    commandName: 'UNLINK',
    dataGroup: 'generic',
    dataName: 'unlink',
    link: '/commands/unlink',
    summary: 'Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.'
  },
  {
    args: '',
    commandName: 'UNWATCH',
    dataGroup: 'transactions',
    dataName: 'unwatch',
    link: '/commands/unwatch',
    summary: 'Forget about all watched keys'
  },
  {
    args: 'numreplicas timeout',
    commandName: 'WAIT',
    dataGroup: 'generic',
    dataName: 'wait',
    link: '/commands/wait',
    summary: 'Wait for the synchronous replication of all the write commands sent in the context of the current connection'
  },
  {
    args: 'key [key ...]',
    commandName: 'WATCH',
    dataGroup: 'transactions',
    dataName: 'watch',
    link: '/commands/watch',
    summary: 'Watch the given keys to determine execution of the MULTI/EXEC block'
  },
  {
    args: 'key [NX|XX] [GT|LT] [CH] [INCR] score member [score member ...]',
    commandName: 'ZADD',
    dataGroup: 'sorted_set',
    dataName: 'zadd',
    link: '/commands/zadd',
    summary: 'Add one or more members to a sorted set, or update its score if it already exists'
  },
  {
    args: 'key',
    commandName: 'ZCARD',
    dataGroup: 'sorted_set',
    dataName: 'zcard',
    link: '/commands/zcard',
    summary: 'Get the number of members in a sorted set'
  },
  {
    args: 'key min max',
    commandName: 'ZCOUNT',
    dataGroup: 'sorted_set',
    dataName: 'zcount',
    link: '/commands/zcount',
    summary: 'Count the members in a sorted set with scores within the given values'
  },
  {
    args: 'numkeys key [key ...] [WITHSCORES]',
    commandName: 'ZDIFF',
    dataGroup: 'sorted_set',
    dataName: 'zdiff',
    link: '/commands/zdiff',
    summary: 'Subtract multiple sorted sets'
  },
  {
    args: 'destination numkeys key [key ...]',
    commandName: 'ZDIFFSTORE',
    dataGroup: 'sorted_set',
    dataName: 'zdiffstore',
    link: '/commands/zdiffstore',
    summary: 'Subtract multiple sorted sets and store the resulting sorted set in a new key'
  },
  {
    args: 'key increment member',
    commandName: 'ZINCRBY',
    dataGroup: 'sorted_set',
    dataName: 'zincrby',
    link: '/commands/zincrby',
    summary: 'Increment the score of a member in a sorted set'
  },
  {
    args: 'numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]',
    commandName: 'ZINTER',
    dataGroup: 'sorted_set',
    dataName: 'zinter',
    link: '/commands/zinter',
    summary: 'Intersect multiple sorted sets'
  },
  {
    args: 'destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]',
    commandName: 'ZINTERSTORE',
    dataGroup: 'sorted_set',
    dataName: 'zinterstore',
    link: '/commands/zinterstore',
    summary: 'Intersect multiple sorted sets and store the resulting sorted set in a new key'
  },
  {
    args: 'key min max',
    commandName: 'ZLEXCOUNT',
    dataGroup: 'sorted_set',
    dataName: 'zlexcount',
    link: '/commands/zlexcount',
    summary: 'Count the number of members in a sorted set between a given lexicographical range'
  },
  {
    args: 'key [count]',
    commandName: 'ZPOPMAX',
    dataGroup: 'sorted_set',
    dataName: 'zpopmax',
    link: '/commands/zpopmax',
    summary: 'Remove and return members with the highest scores in a sorted set'
  },
  {
    args: 'key [count]',
    commandName: 'ZPOPMIN',
    dataGroup: 'sorted_set',
    dataName: 'zpopmin',
    link: '/commands/zpopmin',
    summary: 'Remove and return members with the lowest scores in a sorted set'
  },
  {
    args: 'key [count [WITHSCORES]]',
    commandName: 'ZRANDMEMBER',
    dataGroup: 'sorted_set',
    dataName: 'zrandmember',
    link: '/commands/zrandmember',
    summary: 'Get one or multiple random elements from a sorted set'
  },
  {
    args: 'dst src min max [BYSCORE|BYLEX] [REV] [LIMIT offset count]',
    commandName: 'ZRANGESTORE',
    dataGroup: 'sorted_set',
    dataName: 'zrangestore',
    link: '/commands/zrangestore',
    summary: 'Store a range of members from sorted set into another key'
  },
  {
    args: 'key min max [BYSCORE|BYLEX] [REV] [LIMIT offset count] [WITHSCORES]',
    commandName: 'ZRANGE',
    dataGroup: 'sorted_set',
    dataName: 'zrange',
    link: '/commands/zrange',
    summary: 'Return a range of members in a sorted set'
  },
  {
    args: 'key min max [LIMIT offset count]',
    commandName: 'ZRANGEBYLEX',
    dataGroup: 'sorted_set',
    dataName: 'zrangebylex',
    link: '/commands/zrangebylex',
    summary: 'Return a range of members in a sorted set, by lexicographical range'
  },
  {
    args: 'key max min [LIMIT offset count]',
    commandName: 'ZREVRANGEBYLEX',
    dataGroup: 'sorted_set',
    dataName: 'zrevrangebylex',
    link: '/commands/zrevrangebylex',
    summary: 'Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.'
  },
  {
    args: 'key min max [WITHSCORES] [LIMIT offset count]',
    commandName: 'ZRANGEBYSCORE',
    dataGroup: 'sorted_set',
    dataName: 'zrangebyscore',
    link: '/commands/zrangebyscore',
    summary: 'Return a range of members in a sorted set, by score'
  },
  {
    args: 'key member',
    commandName: 'ZRANK',
    dataGroup: 'sorted_set',
    dataName: 'zrank',
    link: '/commands/zrank',
    summary: 'Determine the index of a member in a sorted set'
  },
  {
    args: 'key member [member ...]',
    commandName: 'ZREM',
    dataGroup: 'sorted_set',
    dataName: 'zrem',
    link: '/commands/zrem',
    summary: 'Remove one or more members from a sorted set'
  },
  {
    args: 'key min max',
    commandName: 'ZREMRANGEBYLEX',
    dataGroup: 'sorted_set',
    dataName: 'zremrangebylex',
    link: '/commands/zremrangebylex',
    summary: 'Remove all members in a sorted set between the given lexicographical range'
  },
  {
    args: 'key start stop',
    commandName: 'ZREMRANGEBYRANK',
    dataGroup: 'sorted_set',
    dataName: 'zremrangebyrank',
    link: '/commands/zremrangebyrank',
    summary: 'Remove all members in a sorted set within the given indexes'
  },
  {
    args: 'key min max',
    commandName: 'ZREMRANGEBYSCORE',
    dataGroup: 'sorted_set',
    dataName: 'zremrangebyscore',
    link: '/commands/zremrangebyscore',
    summary: 'Remove all members in a sorted set within the given scores'
  },
  {
    args: 'key start stop [WITHSCORES]',
    commandName: 'ZREVRANGE',
    dataGroup: 'sorted_set',
    dataName: 'zrevrange',
    link: '/commands/zrevrange',
    summary: 'Return a range of members in a sorted set, by index, with scores ordered from high to low'
  },
  {
    args: 'key max min [WITHSCORES] [LIMIT offset count]',
    commandName: 'ZREVRANGEBYSCORE',
    dataGroup: 'sorted_set',
    dataName: 'zrevrangebyscore',
    link: '/commands/zrevrangebyscore',
    summary: 'Return a range of members in a sorted set, by score, with scores ordered from high to low'
  },
  {
    args: 'key member',
    commandName: 'ZREVRANK',
    dataGroup: 'sorted_set',
    dataName: 'zrevrank',
    link: '/commands/zrevrank',
    summary: 'Determine the index of a member in a sorted set, with scores ordered from high to low'
  },
  {
    args: 'key member',
    commandName: 'ZSCORE',
    dataGroup: 'sorted_set',
    dataName: 'zscore',
    link: '/commands/zscore',
    summary: 'Get the score associated with the given member in a sorted set'
  },
  {
    args: 'numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]',
    commandName: 'ZUNION',
    dataGroup: 'sorted_set',
    dataName: 'zunion',
    link: '/commands/zunion',
    summary: 'Add multiple sorted sets'
  },
  {
    args: 'key member [member ...]',
    commandName: 'ZMSCORE',
    dataGroup: 'sorted_set',
    dataName: 'zmscore',
    link: '/commands/zmscore',
    summary: 'Get the score associated with the given members in a sorted set'
  },
  {
    args: 'destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]',
    commandName: 'ZUNIONSTORE',
    dataGroup: 'sorted_set',
    dataName: 'zunionstore',
    link: '/commands/zunionstore',
    summary: 'Add multiple sorted sets and store the resulting sorted set in a new key'
  },
  {
    args: 'cursor [MATCH pattern] [COUNT count] [TYPE type]',
    commandName: 'SCAN',
    dataGroup: 'generic',
    dataName: 'scan',
    link: '/commands/scan',
    summary: 'Incrementally iterate the keys space'
  },
  {
    args: 'key cursor [MATCH pattern] [COUNT count]',
    commandName: 'SSCAN',
    dataGroup: 'set',
    dataName: 'sscan',
    link: '/commands/sscan',
    summary: 'Incrementally iterate Set elements'
  },
  {
    args: 'key cursor [MATCH pattern] [COUNT count]',
    commandName: 'HSCAN',
    dataGroup: 'hash',
    dataName: 'hscan',
    link: '/commands/hscan',
    summary: 'Incrementally iterate hash fields and associated values'
  },
  {
    args: 'key cursor [MATCH pattern] [COUNT count]',
    commandName: 'ZSCAN',
    dataGroup: 'sorted_set',
    dataName: 'zscan',
    link: '/commands/zscan',
    summary: 'Incrementally iterate sorted sets elements and associated scores'
  },
  {
    args: '[CONSUMERS key groupname] [GROUPS key] [STREAM key] [HELP]',
    commandName: 'XINFO',
    dataGroup: 'stream',
    dataName: 'xinfo',
    link: '/commands/xinfo',
    summary: 'Get information on streams and consumer groups'
  },
  {
    args: 'key [NOMKSTREAM] [MAXLEN|MINID [=|~] threshold [LIMIT count]] *|ID field value [field value ...]',
    commandName: 'XADD',
    dataGroup: 'stream',
    dataName: 'xadd',
    link: '/commands/xadd',
    summary: 'Appends a new entry to a stream'
  },
  {
    args: 'key MAXLEN|MINID [=|~] threshold [LIMIT count]',
    commandName: 'XTRIM',
    dataGroup: 'stream',
    dataName: 'xtrim',
    link: '/commands/xtrim',
    summary: 'Trims the stream to (approximately if \'~\' is passed) a certain size'
  },
  {
    args: 'key ID [ID ...]',
    commandName: 'XDEL',
    dataGroup: 'stream',
    dataName: 'xdel',
    link: '/commands/xdel',
    summary: 'Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.'
  },
  {
    args: 'key start end [COUNT count]',
    commandName: 'XRANGE',
    dataGroup: 'stream',
    dataName: 'xrange',
    link: '/commands/xrange',
    summary: 'Return a range of elements in a stream, with IDs matching the specified IDs interval'
  },
  {
    args: 'key end start [COUNT count]',
    commandName: 'XREVRANGE',
    dataGroup: 'stream',
    dataName: 'xrevrange',
    link: '/commands/xrevrange',
    summary: 'Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE'
  },
  {
    args: 'key',
    commandName: 'XLEN',
    dataGroup: 'stream',
    dataName: 'xlen',
    link: '/commands/xlen',
    summary: 'Return the number of entries in a stream'
  },
  {
    args: '[COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]',
    commandName: 'XREAD',
    dataGroup: 'stream',
    dataName: 'xread',
    link: '/commands/xread',
    summary: 'Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.'
  },
  {
    args: '[CREATE key groupname ID|$ [MKSTREAM]] [SETID key groupname ID|$] [DESTROY key groupname] [CREATECONSUMER key groupname consumername] [DELCONSUMER key groupname consumername]',
    commandName: 'XGROUP',
    dataGroup: 'stream',
    dataName: 'xgroup',
    link: '/commands/xgroup',
    summary: 'Create, destroy, and manage consumer groups.'
  },
  {
    args: 'GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]',
    commandName: 'XREADGROUP',
    dataGroup: 'stream',
    dataName: 'xreadgroup',
    link: '/commands/xreadgroup',
    summary: 'Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.'
  },
  {
    args: 'key group ID [ID ...]',
    commandName: 'XACK',
    dataGroup: 'stream',
    dataName: 'xack',
    link: '/commands/xack',
    summary: 'Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.'
  },
  {
    args: 'key group consumer min-idle-time ID [ID ...] [IDLE ms] [TIME ms-unix-time] [RETRYCOUNT count] [FORCE] [JUSTID]',
    commandName: 'XCLAIM',
    dataGroup: 'stream',
    dataName: 'xclaim',
    link: '/commands/xclaim',
    summary: 'Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.'
  },
  {
    args: 'key group consumer min-idle-time start [COUNT count] [JUSTID]',
    commandName: 'XAUTOCLAIM',
    dataGroup: 'stream',
    dataName: 'xautoclaim',
    link: '/commands/xautoclaim',
    summary: 'Changes (or acquires) ownership of messages in a consumer group, as if the messages were delivered to the specified consumer.'
  },
  {
    args: 'key group [[IDLE min-idle-time] start end count [consumer]]',
    commandName: 'XPENDING',
    dataGroup: 'stream',
    dataName: 'xpending',
    link: '/commands/xpending',
    summary: 'Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.'
  },
  {
    args: '',
    commandName: 'LATENCY DOCTOR',
    dataGroup: 'server',
    dataName: 'latency doctor',
    link: '/commands/latency-doctor',
    summary: 'Return a human readable latency analysis report.'
  },
  {
    args: 'event',
    commandName: 'LATENCY GRAPH',
    dataGroup: 'server',
    dataName: 'latency graph',
    link: '/commands/latency-graph',
    summary: 'Return a latency graph for the event.'
  },
  {
    args: 'event',
    commandName: 'LATENCY HISTORY',
    dataGroup: 'server',
    dataName: 'latency history',
    link: '/commands/latency-history',
    summary: 'Return timestamp-latency samples for the event.'
  },
  {
    args: '',
    commandName: 'LATENCY LATEST',
    dataGroup: 'server',
    dataName: 'latency latest',
    link: '/commands/latency-latest',
    summary: 'Return the latest latency samples for all events.'
  },
  {
    args: '[event [event ...]]',
    commandName: 'LATENCY RESET',
    dataGroup: 'server',
    dataName: 'latency reset',
    link: '/commands/latency-reset',
    summary: 'Reset latency data for one or more events.'
  },
  {
    args: '',
    commandName: 'LATENCY HELP',
    dataGroup: 'server',
    dataName: 'latency help',
    link: '/commands/latency-help',
    summary: 'Show helpful text about the different subcommands.'
  }
]
