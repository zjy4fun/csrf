## CSRF 过程演示

>  漏洞：简单的身份验证仅仅能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的

CSRF就是攻击者盗用了你的身份，以你的名义发送恶意请求

WebA 是含有漏洞的网站，WebB 是恶意网站

在 WebA 登录后，访问 WebB 网站，WebB 网站上借助 WebA 的认证信息进行恶意操作



