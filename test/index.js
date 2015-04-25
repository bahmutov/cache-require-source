var agent = require('webkit-devtools-agent');
agent.start({
  port: 9999,
  bind_to: '0.0.0.0',
  ipc_port: 3333,
  verbose: true
});

process.on('SIGUSR2', function () {
  console.log('SIGUSR2', 'starting loading');

  require('./code');

});
