import Mock from 'mockjs'

let data = {
  users: [],
  types: [],
  posts: [],
  comments: [],
  tasks: [],
  menu: [],
  domain: []
}

data.domain.push(Mock.mock({
  title: '大学物理',
  etitle: 'Physics',
  id: '1'
}))

data.domain.push(Mock.mock({
  title: '线性代数',
  etitle: 'Linear Algebra',
  id: '2'
}))
data.domain.push(Mock.mock({
  title: 'Java A2',
  etitle: 'Java A2',
  id: '3'
}))
data.domain.push(Mock.mock({
  title: 'English',
  etitle: 'English',
  id: '4'
}))

data.menu.push(Mock.mock({
  header: 'XD'
}))
data.menu.push(Mock.mock({
  href: '/',
  title: 'Home',
  icon: 'home'
}))
data.menu.push(Mock.mock({
  href: '/login',
  title: 'logout',
  icon: ''
}))
data.tasks.push(Mock.mock({
  id: 1,
  item: '大物作业',
  eitem: 'Physics',
  content: 'Chapter 13: 1 3 4 5 6 12 ',
  ddl: '@datetime',
  color: '@color',
  finished: true
}))
data.tasks.push(Mock.mock({
  id: 2,
  item: '线代作业',
  eitem: 'Linear Algebra',
  content: 'Section 3.5: 1 3 5 7 9',
  ddl: '@datetime',
  color: '@color',
  finished: true
}))
data.tasks.push(Mock.mock({
  id: 3,
  item: '高数作业',
  eitem: 'Advanced mathmatics',
  content: 'Section 5.6: 13 123 12 2 3 4 ',
  ddl: '@datetime',
  color: '@color',
  finished: true
}))

for (let i = 1; i <= 30; i++) {
  data.users.push(Mock.mock({
    id: i,
    username: '@first',
    password: '123456',
    avatar: '@image',
    nickname: '@name',
    // avatar: Mock.Random.image(),
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

data.users[0].username = 'admin' // default user

for (let i = 1; i <= 6; i++) {
  data.types.push(Mock.mock({
    id: i,
    name: '@first',
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

for (let i = 1; i <= 33; i++) {
  data.posts.push(Mock.mock({
    id: i,
    title: '@title',
    'type_id|1-28': 1,
    'type|1': data.types,
    'user_id|1-10': 1,
    'user|1': data.users,
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

for (let i = 1; i <= 20; i++) {
  data.comments.push(Mock.mock({
    id: i,
    body: '@sentence',
    'post_id|1-28': 1,
    'post|1': data.posts,
    'user_id|1-10': 1,
    'user|1': data.users,
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

data.choices = resource => {
  let ret = []
  let models = data[resource]
  for (let k in models) {
    ret.push({ text: models[k].name, value: models[k].id })
  }
  return ret
}

export default data
