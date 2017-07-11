import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import UserHome from './views/nav1/UserHome.vue'


import regDetail from './views/nav2/regDetail.vue'
import payDetail from './views/nav2/payDetail.vue'
import channelDetail from './views/nav2/channelDetail.vue'
import PromotionLinkList from './views/nav3/PromotionLinkList.vue'
import payRecord from './views/nav4/payRecord.vue'
import receiptSetting from './views/nav4/receiptSetting.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: 'userHome', component: UserHome, name: '概览' }
        ]
    },
    {
        path: '/home',
        component: Home,
        name: '效果报表',
        iconCls: 'fa fa-table', //图标样式class
        children: [{
            path: 'regDetail', component: regDetail, name: '注册明细'
        },{
            path: 'payDetail', component: payDetail, name: '充值明细'
        },{
            path: 'channelDetail', component: channelDetail, name: '渠道明细'
        }]
    },
    {
        path: '/home',
        component: Home,
        name: '推广链接管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: 'linkList', component: PromotionLinkList, name: '推广链接列表' },
        ]
    },
    {
        path: '/home',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-truck',
        children: [
            { path: 'payRecord', component: payRecord, name: '结算记录' },
            { path: 'receiptSetting', component: receiptSetting, name: '收款设置' },
        ]
    },
    {
        path: '/',
        hidden: true,
        redirect: { path: '/home/userHome' }
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        component: NotFound,
        name: '',
        hidden: true
    }
];

// 可做权限管理

// 模拟后台打回的权限列表
var limitArr = {
    '概览': '1',
    '效果报表': '1',
    '充值明细': '1',
    '财务管理': '1',
    '结算记录': '1',
}

// 递归
function getName(data) {
    for(var k in data) {
        if(data[k].leaf && data[k].children.length == 1) {
            var n1 = data[k].children[0].name;
            (limitArr[n1]) ? (data[k].hidden = false) : (data[k].hidden = true);
        }else {
            if(data[k].name) {
               var n2 = data[k].name;
               limitArr[n2] ? (data[k].hidden = false) : (data[k].hidden = true);
            }
            if(data[k].children) {
                getName(data[k].children);
            }
        }
    }
}

getName(routes);



export default routes;