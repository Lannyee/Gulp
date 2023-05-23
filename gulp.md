- 基础模块调用

    ```
    @@include("./include/module.html")
    ```
    
    
    
- 带参模块调用 /* 参数必须使用双引号 */

    ```
    @@include("./include/module.html", {
        "index": "active"
    })
    ```



- 文本变量

    ```
    <div>@@variate</div>
    
    @@include("./include/module.html", {
        "variate": "true"
    })
    ```



- URL变量

    ```
    <a href="@@url">我是一个链接</a>
    
    @@include("./include/module.html", {
        "url": "www.baidu.com"
    })
    ```



- if语句

    ```
    @@if (context.flag) {
        <div>我是一个模块</div>
    }
    
    @@include("./include/module.html", {
        "flag": "true"
    })
    
    
    
    <div class="@@if(context.flag) {active}">我是一个模块</div>
    <div @@if (context.flag === 'true') {class='active'}>我是一个模块</div>
    
    @@include("./include/module.html", {
        "flag": "true"
    })
    ```



- for语句

    ```
    @@for(var i = 0; i < 4; i++) {
        <div class="item">我是一个item</div>
    }
    
    @@include("./include/module.html")
    
    
    
    @@for(var i = 0; i < context.length; i++) {
        <a href="`+context.arr[i].url+`" class="item `+(i == 0 ? 'active' : '')+`">`+context.arr[i].text+`</a>
    }
    
    @@include("./include/module.html", {
        "length": "4",
        "arr": [
            {
                "text": "111",
                "url": "111"
            },
            {
                "text": "222",
                "url": "222"
            },
            {
                "text": "333",
                "url": "333"
            },
            {
                "text": "444",
                "url": "444"
            }
        ]
    })
    ```