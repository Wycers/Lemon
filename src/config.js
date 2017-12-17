const baseUrl = 'http://localhost:8080'
const config = {
  locale: 'en-US', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/api/upload`,
  debug: {
    mock: false, // enable mock
    http: false // http request log
  },
  api: `${baseUrl}/api`
  // locale: 'en', //en
  // api: 'http://192.168.1.108:3333/admin/api'
}

global.config = config

export default config
