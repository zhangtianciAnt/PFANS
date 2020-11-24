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
                  '_id': 'PFANS1038',
                  'name': 'menu.PFANS1038',
                  'menuvisible': true,
                  'menuurl': '/PFANS1038View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1038_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1038_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1038_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1038_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
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
                },
                {
                  '_id': 'PFANS1039',
                  'name': 'menu.PFANS1039',
                  'menuvisible': true,
                  'menuurl': '/PFANS1039View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1039_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1039_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1039_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1039_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1040',
                  'name': 'menu.PFANS1040',
                  'menuvisible': false,
                  'menuurl': '/PFANS1040View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1040_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1040_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1040_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1040_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1041',
                  'name': 'menu.PFANS1041',
                  'menuvisible': false,
                  'menuurl': '/PFANS1041View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1041_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1041_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1041_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1041_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1042',
                  'name': 'menu.PFANS1042',
                  'menuvisible': true,
                  'menuurl': '/PFANS1042View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1042_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1042_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1042_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1042_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
              ]
            },
            // {
            //   '_id': 'SALESTHEME',
            //   'name': 'menu.SALESTHEME',
            //   'menuvisible': true,
            //   'menuurl': '',
            //   'menuicon': '',
            //   'children': [
            //     {
            //       '_id': 'PFANS1039',
            //       'name': 'menu.PFANS1039',
            //       'menuvisible': true,
            //       'menuurl': '/PFANS1039View',
            //       'menuicon': '',
            //       'children': [],
            //       'actions': [
            //         {"_id": "PFANS1039_read", "actiontype": "0", "name": 'button.view', "auth": 4},
            //         {"_id": "PFANS1039_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
            //         {"_id": "PFANS1039_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
            //         {"_id": "PFANS1039_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
            //       ]
            //     }
            //   ]
            // },
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
                  '_id': 'PFANS1045',
                  'name': 'menu.PFANS1045',
                  'menuvisible': true,
                  'menuurl': '/PFANS1045View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1045_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1045_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1045_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1045_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
              '_id': 'PFANS1024',
              'name': 'menu.PFANS1024',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'COMMISSIONCONTRACTyouwenti',
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
                {
                  '_id': 'PFANS1044',
                  'name': 'title.PFANS1044VIEW',
                  'menuvisible': true,
                  'menuurl': '/PFANS1044View',
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
              '_id': 'COMMISSIONCONTRACT',
              'name': 'menu.COMMISSIONCONTRACT',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
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
                {
                  '_id': 'PFANS1046',
                  'name': 'menu.PFANS1046',
                  'menuvisible': true,
                  'menuurl': '/PFANS1046View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1046_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1046_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1046_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1046_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                  '_id': 'PFANS1027',
                  'name': 'menu.PFANS1027',
                  'menuvisible': true,
                  'menuurl': '/PFANS1027View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1027_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1027_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1027_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1027_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1028',
                  'name': 'menu.PFANS1028',
                  'menuvisible': true,
                  'menuurl': '/PFANS1028View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1028_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1028_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1028_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1028_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1029',
                  'name': 'menu.PFANS1029',
                  'menuvisible': true,
                  'menuurl': '/PFANS1029View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1029_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1029_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1029_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1029_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },{
                  '_id': 'PFANS1030',
                  'name': 'menu.PFANS1030',
                  'menuvisible': true,
                  'menuurl': '/PFANS1030View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1030_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1030_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1030_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1030_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS1031',
                  'name': 'menu.PFANS1031',
                  'menuvisible': true,
                  'menuurl': '/PFANS1031View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1031_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1031_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1031_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1031_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
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
              ]
            },
            {
              '_id': 'OTHERCONTRACT',
              'name': 'menu.OTHERCONTRACT',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS1047',
                  'name': 'menu.PFANS1047',
                  'menuvisible': true,
                  'menuurl': '/PFANS1047View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS1047_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS1047_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS1047_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS1047_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                  'menuurl': '/PFANS1008FormView',
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
              ]
            },
            {
              '_id': 'ASSETS1',
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
                // {
                //   '_id': 'ASSETS1003,',
                //   'name': 'menu.ASSETS1003',
                //   'menuvisible': true,
                //   'menuurl': '/ASSETS1003View',
                //   'menuicon': '',
                //   'children': [],
                //   'actions': [
                //     {"_id": "ASSETS1003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                //     {"_id": "ASSETS1003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                //     {"_id": "ASSETS1003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                //     {"_id": "ASSETS1003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                //   ]
                // },
              ]
            },
            // {
            //   '_id': 'SOFTASSETMANAG',
            //   'name': 'menu.SOFTASSETMANAG',
            //   'menuvisible': true,
            //   'menuurl': '',
            //   'menuicon': '',
            //   'children': [
            //     {
            //       '_id': 'ASSETS1034,',
            //       'name': 'menu.PFANS1034',
            //       'menuvisible': true,
            //       'menuurl': '/PFANS1034View',
            //       'menuicon': '',
            //       'children': [],
            //       'actions': [
            //         {"_id": "ASSETS1034_read", "actiontype": "0", "name": 'button.view', "auth": 4},
            //         {"_id": "ASSETS1034_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
            //         {"_id": "ASSETS1034_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
            //         {"_id": "ASSETS1034_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
            //       ]
            //     },
            //   ]
            // },
            //3.28 gbb
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
              '_id': 'use2r2',
              'name': 'menu.user2',
              'menuvisible': true,
              'menuurl': '/OnlyusersView',
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
              '_id': 'PERSONNEL',
              'name': 'menu.PERSONNELINOUT',
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
                {
                  '_id': 'PFANS2033',
                  'name': 'menu.PFANS2033',
                  'menuvisible': false,
                  'menuurl': '/PFANS2033View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2033_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2033_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2033_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2033_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2034',
                  'name': 'menu.PFANS2034',
                  'menuvisible': false,
                  'menuurl': '/PFANS2034View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2034_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2034_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2034_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2034_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2035',
                  'name': 'menu.PFANS2035',
                  'menuvisible': false,
                  'menuurl': '/PFANS2035View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2035_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2035_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2035_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2035_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                {
                  '_id': 'PFANS2032',
                  'name': 'menu.PFANS2032',
                  'menuvisible': true,
                  'menuurl': '/PFANS2032View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2032_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2032_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2032_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2032_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                // {
                //   '_id': 'PFANS2014',
                //   'name': 'menu.PFANS2014',
                //   'menuvisible': true,
                //   'menuurl': '/PFANS2014View',
                //   'menuicon': '',
                //   'children': [],
                //   'actions': [
                //     {"_id": "PFANS2014_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                //     {"_id": "PFANS2014_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                //     {"_id": "PFANS2014_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                //     {"_id": "PFANS2014_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                //   ]
                // },
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
                  '_id': 'PFANS2029',
                  'name': 'menu.PFANS2029',
                  'menuvisible': true,
                  'menuurl': '/PFANS2029View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2029_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2029_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2029_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2029_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                  '_id': 'PFANS2027',
                  'name': 'menu.PFANS2027',
                  'menuvisible': true,
                  'menuurl': '/PFANS2027View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2027_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2027_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2027_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2027_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                  '_id': 'PFANS2028',
                  'name': 'menu.PFANS2028',
                  'menuvisible': true,
                  'menuurl': '/PFANS2028View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2028_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2028_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2028_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2028_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
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
                  '_id': 'PFANS2030',
                  'name': 'menu.PFANS2030',
                  'menuvisible': true,
                  'menuurl': '/PFANS2030View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2030_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2030_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2030_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2030_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                {
                  '_id': 'PFANS2007',
                  'name': 'menu.PFANS2007',
                  'menuvisible': true,
                  'menuurl': '/PFANS2007FormView',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS2007_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS2007_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS2007_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS2007_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                //3.28 gbb
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
              '_id': 'PFANS5015',
              'name': 'menu.PFANS5015',
              'menuvisible': true,
              'menuurl': '/PFANS5015View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS5015_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS5015_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS5015_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS5015_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PJCASE',
              'name': 'menu.PJCASE',
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
                {
                  '_id': 'PFANS5013',
                  'name': 'menu.PFANS5013',
                  'menuvisible': true,
                  'menuurl': '/PFANS5013View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS5013_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS5013_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS5013_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS5013_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                  ]
                },
                // {
                //   '_id': 'PFANS5002',
                //   'name': 'menu.PFANS5002',
                //   'menuvisible': true,
                //   'menuurl': '/PFANS5002View',
                //   'menuicon': '',
                //   'children': [],
                //   'actions': [
                //     {"_id": "PFANS5002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                //     {"_id": "PFANS5002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                //     {"_id": "PFANS5002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                //     {"_id": "PFANS5002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
                //   ]
                // },
              ]
            },
            {
              '_id': 'PJPROGRESS',
              'name': 'menu.PJPROGRESS',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS5009',
                  'name': 'menu.PFANS5009',
                  'menuvisible': true,
                  'menuurl': '/PFANS5009View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {
                      "_id": "PFANS5009_read",
                      "actiontype": "0",
                      "name": 'button.view',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5009_new",
                      "actiontype": "new",
                      "name": 'button.insert',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5009_edit",
                      "actiontype": "edit",
                      "name": 'button.update',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5009_del",
                      "actiontype": "del",
                      "name": 'button.delete',
                      "auth": 4
                    }
                  ]
                },
                //del_fjl_0710  禅道任务302  start
                // {
                //   '_id': 'PFANS5011',
                //   'name': 'menu.PFANS5011',
                //   'menuvisible': true,
                //   'menuurl': '/PFANS5011View',
                //   'menuicon': '',
                //   'children': [],
                //   'actions': [
                //     {
                //       "_id": "PFANS5011_read",
                //       "actiontype": "0",
                //       "name": 'button.view',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5011_new",
                //       "actiontype": "new",
                //       "name": 'button.insert',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5011_edit",
                //       "actiontype": "edit",
                //       "name": 'button.update',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5011_del",
                //       "actiontype": "del",
                //       "name": 'button.delete',
                //       "auth": 4
                //     }
                //   ]
                // },
                // {
                //   '_id': 'PFANS5012',
                //   'name': 'menu.PFANS5012',
                //   'menuvisible': true,
                //   'menuurl': '/PFANS5012View',
                //   'menuicon': '',
                //   'children': [],
                //   'actions': [
                //     {
                //       "_id": "PFANS5012_read",
                //       "actiontype": "0",
                //       "name": 'button.view',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5012_new",
                //       "actiontype": "new",
                //       "name": 'button.insert',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5012_edit",
                //       "actiontype": "edit",
                //       "name": 'button.update',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5012_del",
                //       "actiontype": "del",
                //       "name": 'button.delete',
                //       "auth": 4
                //     }
                //   ]
                // },
                //del_fjl_0710  禅道任务302  end
              ]
            },
            {
              '_id': 'PJOVER',
              'name': 'menu.PJOVER',
              'menuvisible': true,
              'menuurl': '',
              'menuicon': '',
              'children': [
                {
                  '_id': 'PFANS5004',
                  'name': 'menu.PFANS5004',
                  'menuvisible': true,
                  'menuurl': '/PFANS5004View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {
                      "_id": "PFANS5004_read",
                      "actiontype": "0",
                      "name": 'button.view',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5004_new",
                      "actiontype": "new",
                      "name": 'button.insert',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5004_edit",
                      "actiontype": "edit",
                      "name": 'button.update',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5004_del",
                      "actiontype": "del",
                      "name": 'button.delete',
                      "auth": 4
                    }
                  ]
                },
                {
                  '_id': 'PFANS5014',
                  'name': 'menu.PFANS5014',
                  'menuvisible': true,
                  'menuurl': '/PFANS5014View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {
                      "_id": "PFANS5014_read",
                      "actiontype": "0",
                      "name": 'button.view',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5014_new",
                      "actiontype": "new",
                      "name": 'button.insert',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5014_edit",
                      "actiontype": "edit",
                      "name": 'button.update',
                      "auth": 4
                    },
                    {
                      "_id": "PFANS5014_del",
                      "actiontype": "del",
                      "name": 'button.delete',
                      "auth": 4
                    }
                  ]
                },
                // {
                //   '_id': 'PFANS5005',
                //   'name': 'menu.PFANS5005',
                //   'menuvisible': true,
                //   'menuurl': '/PFANS5005View',
                //   'menuicon': '',
                //   'children': [],
                //   'actions': [
                //     {
                //       "_id": "PFANS5005_read",
                //       "actiontype": "0",
                //       "name": 'button.view',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5005_new",
                //       "actiontype": "new",
                //       "name": 'button.insert',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5005_edit",
                //       "actiontype": "edit",
                //       "name": 'button.update',
                //       "auth": 4
                //     },
                //     {
                //       "_id": "PFANS5005_del",
                //       "actiontype": "del",
                //       "name": 'button.delete',
                //       "auth": 4
                //     }
                //   ]
                // },
              ]
            }
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
            {
              '_id': 'PFANS4002',
              'name': 'menu.PFANS4002',
              'menuvisible': true,
              'menuurl': '/PFANS4002View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS4002_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS4002_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS4002_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS4002_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS20060',
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
              '_id': 'PFANS20300',
              'name': 'menu.PFANS2030',
              'menuvisible': true,
              'menuurl': '/PFANS2030View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS2030_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS2030_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS2030_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS2030_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
                  'menuurl': '/PFANS6005FormView',
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
                {
                  '_id': 'PFANS6010',
                  'name': 'menu.PFANS6010',
                  'menuvisible': true,
                  'menuurl': '/PFANS6010View',
                  'menuicon': '',
                  'children': [],
                  'actions': [
                    {"_id": "PFANS6010_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                    {"_id": "PFANS6010_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                    {"_id": "PFANS6010_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                    {"_id": "PFANS6010_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
              '_id': 'PFANS8003',
              'name': 'menu.PFANS8003',
              'menuvisible': false,
              'menuurl': '/PFANS8003View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8003_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8003_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8003_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8003_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
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
              'menuurl': '/PFANS8009View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8009_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8009_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8009_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8009_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS8010',
              'name': 'menu.PFANS8010',
              'menuvisible': false,
              'menuurl': '/PFANS8010View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8010_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8010_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8010_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8010_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
            {
              '_id': 'PFANS8011',
              'name': 'menu.PFANS8011',
              'menuvisible': true,
              'menuurl': '/PFANS8011View',
              'menuicon': '',
              'children': [],
              'actions': [
                {"_id": "PFANS8011_read", "actiontype": "0", "name": 'button.view', "auth": 4},
                {"_id": "PFANS8011_new", "actiontype": "new", "name": 'button.insert', "auth": 4},
                {"_id": "PFANS8011_edit", "actiontype": "edit", "name": 'button.update', "auth": 4},
                {"_id": "PFANS8011_del", "actiontype": "del", "name": 'button.delete', "auth": 4}
              ]
            },
          ]
        },
      ],
      'child': []
    }
  ]
}

