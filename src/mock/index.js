import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import data from './data'

let mock = new MockAdapter(axios, { delayResponse: 80 })
mock.onGet('/user').reply(({ params }) => {
  return [200, {
    uid: params.id,
    name: '李景治',
    ename: 'Jingzhi Li',
    avatar: 'http://www.sustc.edu.cn/upload/images/campus/04shude/%E4%B9%A6%E9%99%A2%E7%AE%80%E4%BB%8B%E7%9B%B8%E5%85%B3/%E6%9D%8E%E6%99%AF%E6%B2%BB_1.jpg',
    address: '慧园3栋406',
    describetion: '非常厉害',
    comments: ['233', '2333']
  }]
})
mock.onGet('/score').reply(({ params }) => {
  return [200, data.scores[0]]
})
mock.onGet('/domainDetail').reply(({ params }) => {
  if (params.id === '1') {
    return [200, {
      lecturer: [{
        name: '李景治',
        uid: 233
      }],
      'TA': [
        {
          name: 'TA1',
          uid: 234
        }, {
          name: 'TA2',
          uid: 235
        }
      ],
      'notice': '233',
      id: params.id
    }]
  } else {
    return [200, {
      lecturer: [{
        name: '好吧',
        uid: 236
      }],
      'TA': [
        {
          name: 'TA3',
          uid: 237
        }, {
          name: 'TA4',
          uid: 238
        }
      ],
      'notice': '233',
      id: params.id
    }]
  }
})
mock.onGet('/tasks').reply(200,
  data.tasks.slice(0, 10)
)
mock.onGet('/domain').reply(200,
  data.domain.slice(0, 10)
)
mock.onPost('/login').reply(200, {
  user: data.users[0],
  token: 'DFJ091283U09AODFUP018923U4J123J'
})

// for `index` action of resources
mock.onGet(/\/(posts|users|types|comments)$/).reply(({ params = { page: 1, perPage: 10 }, url }) => {
  let resource = url.split('/')[1]
  let offset = (params.page - 1) * params.perPage
  let models = data[resource]
  return [200, {
    currentPage: params.page,
    lastPage: Math.ceil(models.length / params.perPage),
    perPage: params.perPage,
    total: data[resource].length,
    data: models.slice(offset, offset + params.perPage)
  }]
})

mock.onGet('/types/grid').reply(200, {
  'options': {
    'sort': 'id',
    'create': false,
    'update': true,
    'delete': false
  },
  'filters': {
    'model': {
      'name': '',
      'created_at': ''
    },
    'fields': {
      'name': {
        'label': 'Name'
      },
      'created_at': {
        'label': 'Created At',
        'type': 'date'
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Id',
      'value': 'id'
    },
    {
      'text': 'Name',
      left: true,
      'value': 'name'
    }
  ]
})

mock.onGet('/settings/form').reply(({ params }) => {
  return [200, {
    'model': {
      name: 'Adminify',
      logo: 'http://placeimg.com/128/128/any',
      date: null,

      type: 1,
      status: 1,

      tags: [],
      description: 'An Awesome Site',
      intro: ''
    },
    'fields': {
      'name': {label: 'Name'},
      'logo': {label: 'Logo', type: 'image'},
      'date': {label: 'Created At', type: 'datetime'},
      'type': {label: 'Type',
        type: 'select',
        choices: [
        {text: 'Blog', value: 1},
        {text: 'Company', value: 2},
        {text: 'Game', value: 3}
        ]},
      'status': {label: 'Status',
        type: 'radios',
        width: 'md3',
        options: [
        {text: 'Enabled', value: 1},
        {text: 'Disabled', value: 2}
        ]},
      'tags': {label: 'Tags',
        type: 'checkboxes',
        width: 'md3',
        options: [
        {text: 'Vue', value: 1},
        {text: 'React', value: 2},
        {text: 'Angular', value: 3}
        ]},
      'description': {label: 'Description(Textarea)', type: 'textarea'},
      'intro': {label: 'Intro', type: 'html'}
    }
  }]
})

mock.onGet('/types/form').reply(({ params }) => {
  return [200, {
    'model': data.types[params.id - 1],
    'fields': {
      'name': {
        'label': 'Name',
        'required': true
      }
    }
  }]
})

mock.onGet('/posts/form').reply(({ params }) => {
  return [200, {
    'model': params.id ? data.posts[params.id - 1] : {
      type_id: null,
      title: null,
      body: null
    },
    'fields': {
      'type_id': {
        'type': 'select',
        'label': 'Type',
        'required': true,
        'options': data.choices('types')
      },
      'title': {
        'label': 'title',
        'required': true
      },
      'body': {
        'label': 'Body',
        'type': 'html'
      }

    }
  }]
})

// for `update` action of resources
mock.onPatch(/\/\w+\/\d+$/).reply(({ params, data: body, url }) => {
  // const id = url.split('/')[2]
  return [200, body]
})
mock.onPost(/\/\w+$/).reply(({ params, data: body, url }) => {
  // const id = url.split('/')[1]
  return [200, body]
})
mock.onGet('/posts/grid').reply(200, {
  'options': {
    'sort': '-id',
    'create': true,
    'update': true,
    'delete': true
  },
  'filters': {
    'model': {
      'title': '',
      'type_id': null,
      'created_at': ''
    },
    'fields': {
      'title': {
        'label': 'Title'
      },
      'type_id': {
        'type': 'select',
        'label': '',
        'options': data.choices('types')
      },
      'created_at': {
        'label': 'Created At',
        'type': 'date'
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Id',
      'value': 'id'
    },
    {
      'text': 'Type',
      left: true,
      'value': 'type.name'
    },
    {
      'text': 'Title',
      left: true,
      'value': 'title'
    },
    {
      'text': 'Created At',
      'value': 'created_at'
    }
  ]
})

mock.onGet('/users/grid').reply(200, {
  'options': {
    'sort': '+id',
    'create': true,
    'update': true,
    'delete': true
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'username': {
        'label': 'Username'
      },
      'type': {
        label: 'Type',
        type: 'select',
        choices: [
          {text: 'All', value: 0},
          {text: 'Teacher', value: 1},
          {text: 'Student', value: 2}
        ]
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'UID',
      mid: true,
      'value': 'uid'
    },
    {
      'text': 'Username',
      mid: true,
      'value': 'username'
    },
    {
      'text': 'Type',
      mid: true,
      'value': 'type'
    },
    {
      'text': 'Nickname',
      mid: true,
      'value': 'nickname'
    }

  ]
})

mock.onGet('/users/form').reply(({ params }) => {
  return [200, {
    'model': data.users[params.id - 1],
    'fields': {
      'username': {
        'label': 'Username',
        'required': true
      },
      'nickname': {
        'label': 'Nickname',
        'required': true
      },
      'type': {
        label: 'Type',
        type: 'select',
        choices: [
          {text: 'Teacher', value: 1},
          {text: 'Student', value: 2}
        ],
        'required': true
      },
      'avatar': {
        'label': 'Avatar',
        'required': true
      }

    }
  }]
})

mock.onGet(/\/\w+\/grid$/i).reply(({ params, url }) => {
  return [200, {
    'options': {
      'sort': 'id',
      'create': true,
      'update': true,
      'delete': true
    },
    'filters': {
      'model': {
        'id': '',
        'created_at': ''
      },
      'fields': {

        'created_at': {
          'label': 'Created At',
          'type': 'date'
        }
      },
      'rules': {}
    },
    'columns': [
      {
        'text': 'Id',
        'value': 'id'
      },
      {
        'text': 'Created At',
        'value': 'created_at'
      }
    ]
  }]
})

export default mock

