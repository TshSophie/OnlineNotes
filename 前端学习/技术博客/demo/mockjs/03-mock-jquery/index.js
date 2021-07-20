if(MOCK == 'true'){

  Mock.mock('/user/userinfo','get',{
    id: "@id()",//得到随机的id,对象
    username: "@cname()",//随机生成中文名字
    date: "@date()",//随机生成日期
    avatar: "@image('200x200','red','#fff','avatar')",//生成图片,参数:size, background, foreground, text
    description: "@paragraph()",//描述
    ip: "@ip()",//IP地址
    email: "@email()"//email
  })

  Mock.mock('/todo/task','get', function(options){
    let a = []
    for (let i = 0; i < 5; i++) {
        let o = Mock.mock({
        _id: "@id()",
        title: '@string("lower", 5)',
        completed: "@boolean"
        }) 
        a.push(o)
    }
    return a
  })
  Mock.mock('/todo/addTask','post', function(options){
    return Mock.mock({
        _id: "@id()",
        title: o.title,
        complete: false
    })
  })
  Mock.mock(/^\/todo\/deleteTask/,'get', function(options){
    let o = JSON.parse(options.body)
    return o
  })
  Mock.mock('/todo/modifyTask','post', function(options){
    let o = JSON.parse(options.body)
    return o
  })
}


