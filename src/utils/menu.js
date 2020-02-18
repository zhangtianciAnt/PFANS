export function app() {
  return [
    // { '_id': '0', 'appname': '系统设置', 'disabled': true, 'url': '/systemsetting', 'appicon': '', 'child': [] }
  ];
}

export function menu() {
  return [
    {
      '_id': 'homePage',
      'appname': "",
      'appicon': '',
      'menus': [
        {
          '_id': 'homePageManagement',
          'name': 'menu.homePageManagement',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-home',
          'children': [
            {
              '_id': 'dashboard',
              'name': 'menu.dashboard',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'dashboard',
                  'name': 'menu.dashboard',
                  'menuvisible': true,
                  'menuurl': '/index',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "dashboard_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "dashboard_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "dashboard_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "dashboard_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                }
              ]
            }
          ]
        },
        {
          '_id': 'MANAGEMENT',
          'name': 'menu.MANAGEMENT',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-marketing',
          'children': [
            {
              '_id': 'PFANS1036',
              'name': 'menu.PFANS1036',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS1036',
                  'name': 'menu.PFANS1036',
                  'menuvisible': true,
                  'menuurl': '/PFANS1036View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1036_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1036_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1036_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1036_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                }
              ]
            },
            {
              '_id': 'JUDGEMENT',
              'name': 'menu.JUDGEMENT',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS1001',
                  'name': 'menu.PFANS1001',
                  'menuvisible': true,
                  'menuurl': '/PFANS1001View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'REIMBURSEMENT',
                  'name': 'menu.REIMBURSEMENT',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [
                    {
                      '_id': 'PFANS1012',
                      'name': 'menu.PFANS1012',
                      'menuvisible': true,
                      'menuurl': '/PFANS1012View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1012_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1012_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1012_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1012_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                    {
                      '_id': 'PFANS1013',
                      'name': 'menu.PFANS1013',
                      'menuvisible': true,
                      'menuurl': '/PFANS1013View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1013_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1013_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1013_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1013_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                  ]
                },
                {
                  '_id': 'PFANS1002',
                  'name': 'menu.PFANS1002',
                  'menuvisible': false,
                  'menuurl': '/PFANS1002FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1035',
                  'name': 'menu.PFANS1035',
                  'menuvisible': false,
                  'menuurl': '/PFANS1035FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1035_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1035_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1035_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1035_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1003',
                  'name': 'menu.PFANS1003',
                  'menuvisible': false,
                  'menuurl': '/PFANS1003FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1004',
                  'name': 'menu.PFANS1004',
                  'menuvisible': false,
                  'menuurl': '/PFANS1004FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1004_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1004_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1004_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1004_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1005',
                  'name': 'menu.PFANS1005',
                  'menuvisible': false,
                  'menuurl': '/PFANS1005FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1005_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1005_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1005_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1005_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1006',
                  'name': 'menu.PFANS1006',
                  'menuvisible': false,
                  'menuurl': '/PFANS1006FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1006_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1006_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1006_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1006_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1007',
                  'name': 'menu.PFANS1007',
                  'menuvisible': false,
                  'menuurl': '/PFANS1007FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1007_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1007_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1007_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1007_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1008',
                  'name': 'menu.PFANS1008',
                  'menuvisible': false,
                  'menuurl': '/PFANS1008View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1008_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1008_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1008_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1008_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1009',
                  'name': 'menu.PFANS1009',
                  'menuvisible': false,
                  'menuurl': '/PFANS1009FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1009_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1009_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1009_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1009_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1010',
                  'name': 'menu.PFANS1010',
                  'menuvisible': false,
                  'menuurl': '/PFANS1010FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1010_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1010_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1010_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1010_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1011',
                  'name': 'menu.PFANS1011',
                  'menuvisible': false,
                  'menuurl': '/PFANS1011FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1011_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1011_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1011_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1011_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1016',
                  'name': 'menu.PFANS1016',
                  'menuvisible': false,
                  'menuurl': '/PFANS1016View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1016_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1016_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1016_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1016_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1017',
                  'name': 'menu.PFANS1017',
                  'menuvisible': false,
                  'menuurl': '/PFANS1017View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1017_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1017_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1017_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1017_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1018',
                  'name': 'menu.PFANS1018',
                  'menuvisible': false,
                  'menuurl': '/PFANS1018View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1018_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1018_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1018_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1018_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1019',
                  'name': 'menu.PFANS1019',
                  'menuvisible': false,
                  'menuurl': '/PFANS1019View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1019_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1019_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1019_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1019_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1020',
                  'name': 'menu.PFANS1020',
                  'menuvisible': false,
                  'menuurl': '/PFANS1020View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1020_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1020_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1020_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1020_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1021',
                  'name': 'menu.PFANS1021',
                  'menuvisible': false,
                  'menuurl': '/PFANS1021View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1021_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1021_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1021_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1021_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1022',
                  'name': 'menu.PFANS1022',
                  'menuvisible': false,
                  'menuurl': '/PFANS1022View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1022_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1022_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1022_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1022_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1023',
                  'name': 'menu.PFANS1023',
                  'menuvisible': false,
                  'menuurl': '/PFANS1023View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1023_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1023_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1023_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1023_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1034',
                  'name': 'menu.PFANS1034',
                  'menuvisible': false,
                  'menuurl': '/PFANS1034FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1034_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1034_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1034_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1034_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            {
              '_id': 'CONTRACT',
              'name': 'menu.CONTRACT',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'COMMISSIONCONTRACT',
                  'name': 'menu.PFANS1024',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [
                    {
                      '_id': 'PFANS1024',
                      'name': 'menu.COMMISSIONCONTRACT',
                      'menuvisible': true,
                      'menuurl': '/PFANS1024View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1024_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1024_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1024_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1024_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                    {
                      '_id': 'PFANS1026',
                      'name': 'menu.BROKERAGECONTRACT',
                      'menuvisible': true,
                      'menuurl': '/PFANS1026View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1026_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1026_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1026_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1026_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                    {
                      '_id': 'PFANS1033',
                      'name': 'menu.OTHERCONTRACT',
                      'menuvisible': true,
                      'menuurl': '/PFANS1033View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1033_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1033_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1033_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1033_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                  ]
                },
                {
                  '_id': 'BROKERAGECONTRACT',
                  'name': 'menu.BROKERAGECONTRACT',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [

                    {
                      '_id': 'PFANS1032',
                      'name': 'menu.PFANS1032',
                      'menuvisible': true,
                      'menuurl': '/PFANS1032View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1032_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1032_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1032_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1032_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                    {
                      '_id': 'PFANS1025',
                      'name': 'menu.PFANS1025',
                      'menuvisible': true,
                      'menuurl': '/PFANS1025View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1025_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1025_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1025_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1025_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                  ]
                },
              ]
            },
            {
              '_id': 'ASSETS',
              'name': 'menu.ASSETMANAG',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'HARDASSETMANAG',
                  'name': 'menu.HARDASSETMANAG',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [
                    {
                      '_id': 'PFANS1037',
                      'name': 'menu.PFANS1037',
                      'menuvisible': true,
                      'menuurl': '/PFANS1037View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                  ]
                },
                {
                  '_id': 'ASSETS',
                  'name': 'menu.ASSETS',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [
                    {
                      '_id': 'ASSETS1001,',
                      'name': 'menu.ASSETS1001',
                      'menuvisible': true,
                      'menuurl': '/ASSETS1001View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "ASSETS1001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "ASSETS1001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "ASSETS1001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "ASSETS1001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                    {
                      '_id': 'ASSETS1002,',
                      'name': 'menu.ASSETS1002',
                      'menuvisible': true,
                      'menuurl': '/ASSETS1002View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "ASSETS1002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "ASSETS1002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "ASSETS1002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "ASSETS1002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                    {
                      '_id': 'ASSETS1003,',
                      'name': 'menu.ASSETS1003',
                      'menuvisible': true,
                      'menuurl': '/ASSETS1003View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "ASSETS1003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "ASSETS1003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "ASSETS1003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "ASSETS1003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                  ]
                },
                {
                  '_id': 'COMMISSIONCONTRACT',
                  'name': 'menu.SOFTASSETMANAG',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [
                    {
                      '_id': 'ASSETS1034,',
                      'name': 'menu.PFANS1034',
                      'menuvisible': true,
                      'menuurl': '/PFANS1034View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "ASSETS1034_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "ASSETS1034_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "ASSETS1034_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "ASSETS1034_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    },
                  ]
                },
                {
                  '_id': 'ITSECURITYMANAGEMENT',
                  'name': 'menu.ITSECURITYMANAGEMENT',
                  'menuvisible': true,
                  'menuurl': '',
                  'menuicon': '',
                  'children': [
                    {
                      '_id': 'PFANS1015',
                      'name': 'menu.ITSECURITYMANAGEMENT',
                      'menuvisible': true,
                      'menuurl': '/PFANS1015View',
                      'menuicon': '',
                      'children': [],
                      'actions': [
                        {"_id": "PFANS1015_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                        {"_id": "PFANS1015_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                        {"_id": "PFANS1015_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                        {"_id": "PFANS1015_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          '_id': 'PERSONNELMATTERS',
          'name': 'menu.PERSONNELMATTERS',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-custom',
          'children': [
            {
              '_id': 'PERSONNEL',
              'name': 'menu.PERSONNEL',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS2001',
                  'name': 'menu.PFANS2001',
                  'menuvisible': true,
                  'menuurl': '/PFANS2001View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2002',
                  'name': 'menu.PFANS2002',
                  'menuvisible': true,
                  'menuurl': '/PFANS2002View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2003',
                  'name': 'menu.PFANS2003',
                  'menuvisible': true,
                  'menuurl': '/PFANS2003View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'user',
                  'name': 'menu.user',
                  'menuvisible': true,
                  'menuurl': '/usersView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "user_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "user_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "user_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "user_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2026',
                  'name': 'menu.PFANS2026',
                  'menuvisible': true,
                  'menuurl': '/PFANS2026View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2026_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2026_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2026_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2026_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            {
              '_id': 'PFANSAPPOINTMENT',
              'name': 'menu.PFANSAPPOINTMENT',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS2023',
                  'name': 'menu.PFANS2023',
                  'menuvisible': true,
                  'menuurl': '/PFANS2023View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2023_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2023_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2023_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2023_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2024',
                  'name': 'menu.PFANS2024',
                  'menuvisible': true,
                  'menuurl': '/PFANS2024View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2024_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2024_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2024_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2024_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            {
              '_id': 'PFANSATTENDANCE',
              'name': 'menu.PFANSATTENDANCE',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS2010',
                  'name': 'menu.PFANS2010',
                  'menuvisible': true,
                  'menuurl': '/PFANS2010View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2010_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2010_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2010_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2010_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2011',
                  'name': 'menu.PFANS2011',
                  'menuvisible': true,
                  'menuurl': '/PFANS2011View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2011_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2011_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2011_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2011_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2013',
                  'name': 'menu.PFANS2013',
                  'menuvisible': true,
                  'menuurl': '/PFANS2013View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2013_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2013_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2013_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2013_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2014',
                  'name': 'menu.PFANS2014',
                  'menuvisible': true,
                  'menuurl': '/PFANS2014View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2014_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2014_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2014_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2014_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2016',
                  'name': 'menu.PFANS2016',
                  'menuvisible': true,
                  'menuurl': '/PFANS2016View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2016_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2016_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2016_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2016_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2017',
                  'name': 'menu.PFANS2017',
                  'menuvisible': true,
                  'menuurl': '/PFANS2017View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2017_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2017_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2017_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2017_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2018',
                  'name': 'menu.PFANS2018',
                  'menuvisible': true,
                  'menuurl': '/PFANS2018View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2018_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2018_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2018_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2018_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2020',
                  'name': 'menu.PFANS2020',
                  'menuvisible': true,
                  'menuurl': '/PFANS2020View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2020_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2020_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2020_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2020_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            {
              '_id': 'GENERALAFFAIRS',
              'name': 'menu.GENERALAFFAIRS',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS3001',
                  'name': 'menu.PFANS3001',
                  'menuvisible': true,
                  'menuurl': '/PFANS3001View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                }, {
                  '_id': 'PFANS3002',
                  'name': 'menu.PFANS3002',
                  'menuvisible': true,
                  'menuurl': '/PFANS3002View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS3003',
                  'name': 'menu.PFANS3003',
                  'menuvisible': true,
                  'menuurl': '/PFANS3003View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS3004',
                  'name': 'menu.PFANS3004',
                  'menuvisible': true,
                  'menuurl': '/PFANS3004View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3004_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3004_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3004_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3004_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS3005',
                  'name': 'menu.PFANS3005',
                  'menuvisible': true,
                  'menuurl': '/PFANS3005View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3005_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3005_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3005_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3005_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS3006',
                  'name': 'menu.PFANS3006',
                  'menuvisible': true,
                  'menuurl': '/PFANS3006View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3006_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3006_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3006_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3006_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS3007',
                  'name': 'menu.PFANS3007',
                  'menuvisible': true,
                  'menuurl': '/PFANS3007View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS3007_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS3007_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS3007_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS3007_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            {
              '_id': 'WAGES', 'name': 'menu.WAGES', 'menuvisible': true, 'menuurl': '', 'menuicon': '', 'children': [
                {
                  '_id': 'PFANS2005',
                  'name': 'menu.PFANS2005',
                  'menuvisible': true,
                  'menuurl': '/PFANS2005View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2005_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2005_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2005_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2005_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2022',
                  'name': 'menu.PFANS2022',
                  'menuvisible': true,
                  'menuurl': '/PFANS2022View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2022_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2022_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2022_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2022_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2006',
                  'name': 'menu.PFANS2006',
                  'menuvisible': true,
                  'menuurl': '/PFANS2006View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2006_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2006_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2006_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2006_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2007',
                  'name': 'menu.PFANS2007',
                  'menuvisible': true,
                  'menuurl': '/PFANS2007View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2007_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2007_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2007_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2007_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2009',
                  'name': 'menu.PFANS2009',
                  'menuvisible': true,
                  'menuurl': '/PFANS2009View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2009_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2009_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2009_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2009_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
          ]
        },
        {
          '_id': 'PFANSPJ',
          'name': 'menu.PFANSPJ',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-data',
          'children': [
            {
              '_id': 'PFANS5008',
              'name': 'menu.PFANS5008',
              'menuvisible': true,
              'menuurl': '/PFANS5008View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS5008_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS5008_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS5008_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS5008_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'APPROVAL',
              'name': 'menu.APPROVAL',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS5001',
                  'name': 'menu.PFANS5001',
                  'menuvisible': true,
                  'menuurl': '/PFANS5001View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS5001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS5001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS5001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS5001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            {
              '_id': 'PFANS5009',
              'name': 'menu.PFANS5009',
              'menuvisible': true,
              'menuurl': '/PFANS5009View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS5009_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS5009_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS5009_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS5009_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS5004',
              'name': 'menu.PFANS5004',
              'menuvisible': true,
              'menuurl': '/PFANS5004View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS5004_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS5004_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS5004_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS5004_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS5005',
              'name': 'menu.PFANS5005',
              'menuvisible': true,
              'menuurl': '/PFANS5005View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS5005_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS5005_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS5005_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS5005_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
          ]
        },
        {
          '_id': 'FINANCIAL',
          'name': 'menu.FINANCIAL',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-finance',
          'children': [
            {
              '_id': 'PFANS4001',
              'name': 'menu.PFANS4001',
              'menuvisible': true,
              'menuurl': '/PFANS4001View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS4001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS4001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS4001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS4001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
          ]
        },
        {
          '_id': 'PFANSBP',
          'name': 'menu.PFANSBP',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-cooperation',
          'children': [
            {
              '_id': 'PFANS6001',
              'name': 'menu.PFANS6001',
              'menuvisible': true,
              'menuurl': '/PFANS6001View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS6001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS6001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS6001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS6001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS6002',
              'name': 'menu.PFANS6002',
              'menuvisible': true,
              'menuurl': '/PFANS6002View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS6002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS6002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS6002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS6002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS6003',
              'name': 'menu.PFANS6003',
              'menuvisible': true,
              'menuurl': '/PFANS6003View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS6003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS6003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS6003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS6003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS6004',
              'name': 'menu.PFANS6004',
              'menuvisible': true,
              'menuurl': '/PFANS6004View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS6004_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS6004_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS6004_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS6004_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'STATIONING',
              'name': 'menu.STATIONING',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS6007',
                  'name': 'menu.PFANS6007',
                  'menuvisible': true,
                  'menuurl': '/PFANS6007View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS6007_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS6007_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS6007_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS6007_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS6005',
                  'name': 'menu.PFANS6005',
                  'menuvisible': true,
                  'menuurl': '/PFANS6005View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS6005_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS6005_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS6005_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS6005_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS6006',
                  'name': 'menu.PFANS6006',
                  'menuvisible': true,
                  'menuurl': '/PFANS6006View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS6006_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS6006_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS6006_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS6006_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS6008',
                  'name': 'menu.PFANS6008',
                  'menuvisible': true,
                  'menuurl': '/PFANS6008View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS6008_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS6008_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS6008_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS6008_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS6009',
                  'name': 'menu.PFANS6009',
                  'menuvisible': true,
                  'menuurl': '/PFANS6009View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS6009_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS6009_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS6009_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS6009_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
          ]
        },
        {
          '_id': 'PFANSSYSTEM',
          'name': 'menu.PFANSSYSTEM',
          'menuvisible': true,
          'menuurl': '',
          'menuicon': 'el-icon-s-tools',
          'children': [
            {
              '_id': 'org',
              'name': 'menu.org',
              'menuvisible': true,
              'menuurl': '/org',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "org_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "org_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "org_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "org_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'role',
              'name': 'menu.role',
              'menuvisible': true,
              'menuurl': '/roleView',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "role_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "role_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "role_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "role_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'workflow',
              'name': 'menu.workflow',
              'menuvisible': true,
              'menuurl': '/workflowView',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "workflow_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "workflow_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "workflow_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "workflow_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS8008',
              'name': 'menu.PFANS8008',
              'menuvisible': true,
              'menuurl': '/PFANS8008View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8008_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8008_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8008_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8008_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS8001',
              'name': 'menu.PFANS8001',
              'menuvisible': false,
              'menuurl': '/PFANS8001View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8001_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8001_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8001_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8001_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS8002',
              'name': 'menu.PFANS8002',
              'menuvisible': false,
              'menuurl': '/PFANS8002View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS8007',
              'name': 'menu.PFANS8007',
              'menuvisible': true,
              'menuurl': '/PFANS8007View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8007_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8007_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8007_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8007_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANSDICTIONARY',
              'name': 'menu.PFANSDICTIONARY',
              'menuvisible': true,
              'menuurl': '/PFANS8009PointView',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8009_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8009_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8009_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8009_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
          ]
        },
      ],
      'child': []
    }
  ]
}

