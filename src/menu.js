export default [
  { 'header': 'XD' },
  { 'href': '/', 'title': 'Home', 'icon': 'home' },
  {
    'title': 'Domain',
    'icon': 'chat',
    'items': [
      {'href': '/domain/1', 'title': 'Linear'},
      {'href': '/domain/2', 'title': 'Physics'}
    ]
  },
  {'href': '/users/students', 'title': 'Students manage', 'icon': 'view_list'},
  {'href': '/users/teachers', 'title': 'Teachers manage', 'icon': 'view_list'},
  { 'href': '/crud/types', 'title': 'Types', 'icon': 'view_list' },
  { 'href': '/crud/posts', 'title': 'Posts', 'icon': 'view_list' },
  { 'href': '/crud/posts/create', 'title': 'Create Post', 'icon': 'note_add' },

  { 'href': '/crud/comments', 'title': 'Comments', 'icon': 'view_list' },
  { 'href': '/crud/users/', 'title': 'Users', 'icon': 'people' },
  { 'href': '/chat', 'title': 'Chat', 'icon': 'chat' },
  {
    'title': 'Pages',
    'icon': 'domain',
    'items': [
      { 'href': '/example', 'title': 'Example' },
      { 'href': '/about', 'title': 'About' }
    ]
  },
  { divider: true },
  { 'header': 'System' },
  { 'href': '/settings', 'title': 'Settings', 'icon': 'settings' },

  { 'href': '/login', 'icon': 'lock', 'title': 'Logout' }
]
