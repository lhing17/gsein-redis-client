export const lang = {
  nav: {
    connection: '连接',
    cheatsheet: '命令速查',
    versions: '历史版本',
    about: '关于'
  },
  header: {
    newConnection: '新建连接',
    removeConnection: '删除连接',
    connectionProperties: '连接属性',
    openTerminal: '打开终端',
    refresh: '刷新',
    switchLanguage: '切换语言'
  },
  dialog: {
    host: '主机',
    port: '端口',
    auth: '密码',
    name: '用户名',
    separator: '分隔符',
    cancel: '取消',
    confirm: '确定',
    testConnection: '测试连接',
    save: '保存',
    operation: '操作',
    edit: '编辑',
    delete: '删除',
    hint: '提示',
    updateHint: '是否将key由{originalKey}修改为{newKey}?',
    updateFailure: '修改失败',
    updateTtlHint: '设置TTL<=0将删除该key，是否确认？',
    deleteHint: '是否确认删除这条数据?',
    deleteKeyHint: '是否确认删除{key}？',
    newLine: '添加新行',
    editLine: '修改行',
    leaveMessage: '留言',
    leaveMessageHolder: '请留下您的问题或建议',
    contact: '联系方式(可选)',
    contactHolder: 'QQ/Email/手机号',
    submit: '提交',
    messageTitle: '意见反馈',
    thanksForFeedback: '感谢您的意见反馈!',
    success: '成功',
    keyName: '键名',
    keyType: '类型',
    enterKeyName: '请输入键名',
    selectKeyType: '请选择类型'
  },
  about: {
    name: '吉森Redis客户端',
    power: '由吉森技术支持',
    copyright: '版权所有 © 2021 G. Seinfeld',
    checkUpdate: '检查更新',
    feedback: '意见反馈',
    manual: '使用说明',
    projectHome: '项目地址'
  },
  versions: {
    changelog: '版本更新日志',
    v1_0: {
      title: '2021年3月 - v1.0',
      content: '初版发布'
    }
  },
  cheatsheet: {
    name: '请输入命令名称',
    type: '请选择类型',
    search: '查询'
  },
  redisInfo: {
    server: '服务器',
    version: 'Redis版本：',
    os: '操作系统：',
    processId: '进程ID：',
    memory: '内存',
    used: '已用内存：',
    peak: '内存占用峰值：',
    usedLua: 'Lua占用内存：',
    status: '状态',
    connected: '客户端连接数：',
    connectionsReceived: '历史连接数：',
    commandsProcessed: '历史命令数：',
    keyValue: '键值统计',
    completeInfo: 'Redis信息全集'
  },
  connection: {
    loadMore: '加载更多',
    newKey: '新增key',
    valid: '有效',
    invalid: '无效',
    invalidConnection: '无效的连接',
    refreshSuccess: '刷新成功',
    refreshFail: '刷新失败',
    hasKeys: '有数据',
    noKeys: '无数据'
  },
  commands: {
    acl_load: '从配置的ACL文件中重新加载ACL',
    acl_save: '将当前ACL规则保存到配置的ACL文件中',
    acl_list: '以ACL配置文件格式列出当前ACL规则',
    acl_users: '列出所有已配置的ACL规则的用户名',
    acl_getuser: '获取特定ACL用户的规则',
    acl_setuser: '修改或创建指定ACL用户的规则',
    acl_deluser: '删除指定的ACL用户和相关规则',
    acl_cat: '列出ACL类别或类别内的命令',
    acl_genpass: '生成用于ACL用户的伪随机安全密码',
    acl_whoami: '返回与当前连接相关联的用户名',
    acl_log: '列出最近由于设置了acl而被拒绝的事件',
    acl_help: '显示关于不同子命令的有用文本',
    append: '在键上附加一个值',
    auth: '向服务器验证',
    bgrewriteaof: '异步重写只追加的文件',
    bgsave: '异步保存数据集到磁盘',
    bitcount: '在字符串中计数设置位',
    bitfield: '对字符串执行任意位域整数操作',
    bitop: '在字符串之间执行位操作',
    bitpos: '查找字符串中设置或清除的第一个位',
    blpop: '删除并获取列表中的第一个元素，或者阻塞直到有一个可用',
    brpop: '删除并获取列表中的最后一个元素，或者阻塞直到有一个可用',
    brpoplpush: '从一个列表中弹出一个元素，将它推入另一个列表并返回它;或阻塞，直到可用为止',
    blmove: '从一个列表中弹出一个元素，将它推入另一个列表并返回它;或阻塞，直到可用为止',
    bzpopmin: '从一个或多个排序集中移除并返回得分最低的成员，或者阻塞直到有一个可用',
    bzpopmax: '从一个或多个排序集中移除并返回得分最高的成员，或者阻塞直到有一个可用',
    client_caching: '指示服务器是否跟踪下一个请求中的键',
    client_id: '返回当前连接的客户端ID',
    client_info: '返回有关当前客户端连接的信息。',
    client_kill: '终止客户端的连接',
    client_list: '获取客户端连接列表',
    client_getname: '获取当前连接名称',
    client_getredir: '获取跟踪通知重定向客户端ID(如果有的话)',
    client_unpause: '继续处理暂停的客户端',
    client_pause: '停止处理来自客户端的命令一段时间',
    client_reply: '指示服务器是否响应命令',
    client_setname: '设置当前连接名称',
    client_tracking: '启用或禁用服务器辅助客户端缓存支持',
    client_trackinginfo: '返回关于当前连接的服务器辅助客户端缓存的信息',
    client_unblock: '解除阻塞命令阻塞的客户端来自不同的连接',
    cluster_addslots: '为接收节点分配新的哈希槽',
    cluster_bumpepoch: '提前集群配置纪元',
    cluster_count_failure_reports: '返回给定节点的活动故障报告数',
    cluster_countkeysinslot: '返回指定哈希槽中的本地键数',
    cluster_delslots: '在接收节点中设置散列槽位为未绑定',
    cluster_failover: '强制副本执行其主副本的手动故障转移。',
    cluster_flushslots: '删除节点自身的槽位信息',
    cluster_forget: '从节点表中移除一个节点',
    cluster_getkeysinslot: '返回指定哈希槽中的本地键名',
    cluster_info: '提供Redis集群节点状态信息',
    cluster_keyslot: '返回指定键的散列槽',
    cluster_meet: '强制一个节点集群与另一个节点握手',
    cluster_myid: '返回节点id',
    cluster_nodes: '获取节点的集群配置',
    cluster_replicate: '将节点重新配置为指定主节点的副本',
    cluster_reset: '重置Redis集群节点',
    cluster_saveconfig: '强制节点将集群状态保存在磁盘上',
    cluster_set_config_epoch: '在新节点中设置配置的epoch',
    cluster_setslot: '将哈希槽绑定到特定节点',
    cluster_slaves: '列出指定主节点的复制节点',
    cluster_replicas: '列出指定主节点的复制节点',
    cluster_slots: '获取群集槽位到节点映射的数组',
    command: '获取Redis命令的详细信息',
    command_count: '获取Redis命令的总数',
    command_getkeys: '提取密钥给出一个完整的Redis命令',
    command_info: '获取Redis命令的详细信息',
    config_get: '获取配置参数的值',
    config_rewrite: '用内存配置重写配置文件',
    config_set: '将配置参数设置为给定值',
    config_resetstat: '重置INFO返回的统计信息',
    copy: '复制一把钥匙',
    dbsize: '返回所选数据库中的键数',
    debug_object: '获取关于某个键的调试信息',
    debug_segfault: '使服务器崩溃',
    decr: '将键的整数值递减1',
    decrby: '将键的整数值按给定的数字递减',
    del: '删除一个关键',
    discard: '丢弃MULTI之后发出的所有命令',
    dump: '返回存储在指定键处的值的序列化版本。',
    echo: '返回给定的字符串',
    eval: '执行Lua脚本服务器端',
    evalsha: '执行Lua脚本服务器端',
    exec: '执行MULTI后发出的所有命令',
    exists: '确定密钥是否存在',
    expire: '设置一个键的存活时间以秒为单位',
    expireat: '将密钥的过期时间设置为UNIX时间戳',
    failover: '在此服务器和它的一个副本之间启动协调的故障转移。',
    flushall: '从所有数据库中删除所有键',
    flushdb: '从当前数据库中删除所有键',
    geoadd: '在使用排序集表示的地理空间索引中添加一个或多个地理空间项',
    geohash: '将地理空间索引的成员作为标准的geohash字符串返回',
    geopos: '返回地理空间索引成员的经度和纬度',
    geodist: '返回地理空间索引的两个成员之间的距离',
    georadius: '查询表示地理空间索引的排序集，以获取与某点的给定最大距离匹配的成员',
    georadiusbymember: '查询表示地理空间索引的排序集，以获取与成员的给定最大距离匹配的成员',
    geosearch: '查询表示地理空间索引的排序集，以获取框或圆区域内的成员。',
    geosearchstore: '查询表示地理空间索引的排序集，以获取框或圆区域内的成员，并将结果存储在另一个键中。',
    get: '获取一个键的值',
    getbit: '返回存储在键值的字符串值中的偏移位置的位值',
    getdel: '获取一个键的值并删除该键',
    getex: '获取键的值并可选地设置其过期时间',
    getrange: '获取存储在某个键上的字符串的子字符串',
    getset: '设置键的字符串值并返回其旧值',
    hdel: '删除一个或多个散列字段',
    hello: '握手与复述,',
    hexists: '确定是否存在散列字段',
    hget: '获取散列字段的值',
    hgetall: '获取散列中的所有字段和值',
    hincrby: '将散列字段的整数值按给定的数字递增',
    hincrbyfloat: '将散列字段的浮点值按给定的数量递增',
    hkeys: '在散列中获取所有字段',
    hlen: '获取散列中字段的数目',
    hmget: '获取所有给定散列字段的值',
    hmset: '将多个散列字段设置为多个值',
    hset: '设置散列字段的字符串值',
    hsetnx: '只有当散列字段不存在时，才设置该字段的值',
    hrandfield: '从散列中获取一个或多个随机字段',
    hstrlen: '获取散列字段值的长度',
    hvals: '获取散列中的所有值',
    incr: '将键的整数值加1',
    incrby: '将键的整数值按给定的数量递增',
    incrbyfloat: '将键的浮点值按给定的数量递增',
    info: '获取有关服务器的信息和统计信息',
    lolwut: '展示一些电脑艺术和Redis版本',
    keys: '找到与给定模式匹配的所有键',
    lastsave: '获取上次成功保存到磁盘的UNIX时间戳',
    lindex: '通过索引从列表中获取元素',
    linsert: '在列表中，在另一个元素之前或之后插入一个元素',
    llen: '获取列表的长度',
    lpop: '删除并获取列表中的第一个元素',
    lpos: '返回列表中匹配元素的索引',
    lpush: '将一个或多个元素前置到列表中',
    lpushx: '只有当列表存在时，才将元素添加到列表前',
    lrange: '从列表中获取一个元素范围',
    lrem: '从列表中删除元素',
    lset: '通过元素的索引设置列表中元素的值',
    ltrim: '将列表修剪到指定的范围',
    memory_doctor: '输出内存问题报告',
    memory_help: '显示关于不同子命令的有用文本',
    memory_malloc_stats: '显示分配器内部统计',
    memory_purge: '请求分配器释放内存',
    memory_stats: '显示内存使用详情',
    memory_usage: '估计键的内存使用情况',
    mget: '获取所有给定键的值',
    migrate: '原子地将一个键从一个Redis实例转移到另一个。',
    module_list: '列出服务器加载的所有模块',
    module_load: '加载模块',
    module_unload: '卸载模块',
    monitor: '实时监听服务器接收到的所有请求',
    move: '移动一个键到另一个数据库',
    mset: '设置多个键为多个值',
    msetnx: '只有当所有键都不存在时，才能将多个键设置为多个值',
    multi: '标记事务块的开始',
    object: '检查Redis对象的内部',
    persist: '移除密钥的过期',
    pexpire: '设置一个键存在的时间，以毫秒为单位',
    pexpireat: '将密钥的过期时间设置为UNIX时间戳，以毫秒为单位指定',
    pfadd: '将指定的元素添加到指定的HyperLogLog。',
    pfcount: '返回HyperLogLog在键处观察到的集合的近似基数。',
    pfmerge: '合并N个不同的hyperloglog为一个单一的hyperloglog。',
    ping: 'Ping服务器',
    psetex: '设置键的值和过期时间(以毫秒为单位)',
    psubscribe: '监听发布到匹配给定模式的通道上的消息',
    pubsub: '检查发布/订阅子系统的状态',
    pttl: '以毫秒为单位计算密钥的存活时间',
    publish: '向一个频道发布一条消息',
    punsubscribe: '停止侦听发布到匹配给定模式的通道上的消息',
    quit: '关闭连接',
    randomkey: '从键空间返回一个随机键',
    readonly: '启用到集群复制节点的连接的读查询',
    readwrite: '禁止对集群复制节点的连接进行读查询',
    rename: '重命名一个关键',
    renamenx: '只有当新密钥不存在时，才重命名密钥',
    reset: '重置连接',
    restore: '使用提供的序列化值创建一个密钥，该值以前是使用DUMP获得的。',
    role: '返回复制上下文中实例的角色',
    rpop: '删除并获取列表中的最后一个元素',
    rpoplpush: '删除列表中的最后一个元素，将它添加到另一个列表中并返回它',
    lmove: '从一个列表中弹出一个元素，将它推入另一个列表并返回它',
    rpush: '向列表中添加一个或多个元素',
    rpushx: '仅当列表存在时，才向列表添加元素',
    sadd: '向集合中添加一个或多个成员',
    save: '同步地将数据集保存到磁盘',
    scard: '获取集合中的成员数',
    script_debug: '为执行的脚本设置调试模式。',
    script_exists: '检查脚本缓存中是否存在脚本。',
    script_flush: '从脚本缓存中删除所有脚本。',
    script_kill: '终止当前正在执行的脚本。',
    script_load: '将指定的Lua脚本加载到脚本缓存中。',
    sdiff: '减去多组',
    sdiffstore: '减去多个集合并将结果集存储在一个键中',
    select: '更改当前连接的选定数据库',
    set: '设置键的字符串值',
    setbit: '设置或清除存储在键值的字符串值中的偏移位',
    setex: '设置密钥的值和过期时间',
    setnx: '只有当某个键不存在时，才能设置该键的值',
    setrange: '覆盖字符串中从指定偏移量开始的关键字部分',
    shutdown: '同步地将数据集保存到磁盘，然后关闭服务器',
    sinter: '相交多组',
    sinterstore: '交叉多个集合并将结果集存储在一个键中',
    sismember: '确定给定值是否是集合的成员',
    smismember: '返回与集合的给定元素相关联的成员关系',
    slaveof: '使服务器成为另一个实例的副本，或将其提升为主实例。从Redis 5开始弃用。使用REPLICAOF代替。',
    replicaof: '使服务器成为另一个实例的副本，或将其提升为主实例。',
    slowlog: '管理Redis慢查询日志',
    smembers: '获取集合中的所有成员',
    smove: '将成员从一个集合移动到另一个集合',
    sort: '对list、set或sorted set中的元素进行排序',
    spop: '从集合中移除并返回一个或多个随机成员',
    srandmember: '从集合中获取一个或多个随机成员',
    srem: '从集合中删除一个或多个成员',
    stralgo: '对字符串运行算法(当前的LCS)',
    strlen: '获取存储在键中的值的长度',
    subscribe: '监听发布到给定通道的消息',
    sunion: '添加多个集',
    sunionstore: '添加多个集合并将结果集存储在一个键中',
    swapdb: '交换两个Redis数据库',
    sync: '内部命令，用于复制',
    psync: '内部命令，用于复制',
    time: '返回当前服务器时间',
    touch: '更改密钥的最后访问时间。返回指定的现有键数。',
    ttl: '有时间为钥匙而活',
    type: '确定存储在key中的类型',
    unsubscribe: '停止监听发送到指定通道的消息',
    unlink: '在另一个线程中异步删除一个键。否则，它只是DEL，但非阻塞。',
    unwatch: '忘记所有被看守的钥匙',
    wait: '等待在当前连接上下文中发送的所有写命令的同步复制',
    watch: '观察给定的键以确定MULTI/EXEC块的执行情况',
    zadd: '向排序集添加一个或多个成员，如果已经存在，则更新其分数',
    zcard: '获取排序集中的成员数量',
    zcount: '在给定的值中计算具有分数的排序集合中的成员',
    zdiff: '减去多个排序集',
    zdiffstore: '减去多个排序集，并将结果排序集存储在一个新的键中',
    zincrby: '递增排序集合中成员的分数',
    zinter: '交叉多个排序集',
    zinterstore: '交叉多个排序集，并将结果排序集存储在一个新的键中',
    zlexcount: '计算给定字典范围内排序集中的成员数目',
    zpopmax: '删除并返回排序集合中得分最高的成员',
    zpopmin: '删除并返回排序集合中得分最低的成员',
    zrandmember: '从已排序的集合中获取一个或多个随机元素',
    zrangestore: '将已排序集合中的一组成员存储到另一个键中',
    zrange: '返回已排序集合中的成员范围',
    zrangebylex: '按字典范围返回已排序集合中的成员范围',
    zrevrangebylex: '返回排序集中的成员范围，按字典范围从高到低的字符串排序。',
    zrangebyscore: '按分数返回已排序集合中的成员范围',
    zrank: '确定已排序集合中成员的索引',
    zrem: '从已排序的集合中移除一个或多个成员',
    zremrangebylex: '删除给定字典范围内排序集中的所有成员',
    zremrangebyrank: '删除给定索引内排序集的所有成员',
    zremrangebyscore: '删除给定分数内排序集的所有成员',
    zrevrange: '根据索引返回排序集合中的成员范围，其分数从高到低排序',
    zrevrangebyscore: '按分数返回排序集合中的成员范围，分数从高到低排序',
    zrevrank: '确定排序集中成员的索引，分数从高到低排序',
    zscore: '获取排序集中与给定成员相关联的分数',
    zunion: '添加多个排序集',
    zmscore: '获取与排序集中的给定成员相关联的分数',
    zunionstore: '添加多个排序集，并将结果排序集存储在一个新的键中',
    scan: '递增迭代键空间',
    sscan: '递增迭代集合元素',
    hscan: '递增迭代散列字段和关联值',
    zscan: '递增迭代已排序的集合元素和相关的分数',
    xinfo: '获取信息流和消费者群体的信息',
    xadd: '向流添加一个新条目',
    xtrim: '修剪流到一定的大小(如果传递了\'~\'则大致如此)',
    xdel: '从流中删除指定的条目。返回实际删除的项目数，这可能与传递的id数不同，以防某些id不存在。',
    xrange: '返回流中的元素范围，其中的id与指定的id间隔匹配',
    xrevrange: '返回流中的一个元素范围，其中的id匹配指定的id间隔，与XRANGE相比，顺序相反(从大到小)',
    xlen: '返回流中的条目数',
    xread: '返回多个流中从未见过的元素，每个流的id大于调用者报告的id。可以阻止。',
    xgroup: '创建、破坏和管理消费者群体。',
    xreadgroup: '从使用使用者组的流中返回新条目，或访问给定使用者的挂起条目的历史记录。可以阻止。',
    xack: '将挂起的消息标记为正确处理的消息，从而有效地将其从使用者组的挂起条目列表中删除。该命令的返回值是成功确认的消息数，即我们实际上能够在PEL中解析的id。',
    xclaim: '更改(或获得)使用者组中消息的所有权，就像消息被传递给指定的使用者一样。',
    xautoclaim: '更改(或获得)使用者组中消息的所有权，就像消息被传递给指定的使用者一样。',
    xpending: '从流消费者组挂起的条目列表中返回信息和条目，这些信息和条目是已获取但从未被确认的消息。',
    latency_doctor: '返回人类可读的延迟分析报告。',
    latency_graph: '返回事件的延迟图。',
    latency_history: '返回事件的时间戳-延迟样本。',
    latency_latest: '返回所有事件的最新延迟示例。',
    latency_reset: '重置一个或多个事件的延迟数据。',
    latency_help: '显示关于不同子命令的有用文本。'
  }
}
