## npm简介

npm是世界上最大的软件包注册中心，各地的开源开发人员使用npm来分享和获取软件包，你可以使用npm来管理私有开发。

npm是Node JavaScript平台的包管理器。它将模块放置在适当的位置，以便节点能够找到它们，并智能地管理依赖关系冲突。
它非常可配置以支持各种用例。最常见的是，您使用它发布、发现、安装和开发节点程序。


**npm由三个部分组成：**

- 网站

  - 可以访问https://npmjs.com来查找软件包，设置个人npm账户信息等

- 命令行工具 (CLI)

  - 在计算机安装npm后可以在终端运行它，开发人员通常用它来下载、发布npm包

- 注册表（registry）

  - 注册表是一个大型的JavaScript软件和相关元信息的公共数据库


**可以用npm做什么？**

- 调整应用程序的代码包，或按原样合并程序包。
- 立即下载可以使用的独立工具。
- 无需使用npx下载即可运行包。
- 随时随地与任何npm用户共享代码。
- 限制特定开发人员使用代码。
- 创建组织以协调包维护、编码和开发人员。
- 利用组织组建虚拟团队。
- 管理多个版本的代码和代码依赖关系。
- 在更新基础代码时轻松更新应用程序。
- 探索解决同一难题的多种方法。
- 找到正在处理类似问题和项目的其他开发人员。



## npm账户

**注册账户**

- 可去npm官网注册: [https://www.npmjs.com](https://www.npmjs.com/)；
- 也可以通过命令行注册(需要先安装好npm，后面讲)

首先得将npm镜像源切换为官方的源，大部分人的镜像源可能为淘宝镜像源，其他的也不行，想发布就得切换为npm官方镜像源

```shell
npm config set registry=https://registry.npmjs.org
```

**命令行注册**

```shell
npm adduser
```

依次填入账号、密码、邮箱, 填写完成后邮箱会收到一个npm发的一次性密码(也就是验证码) 再次填入即可，如果还未填写就报错，多半是得需要墙

**命令行登录**

```shell
npm login
```



## 安装npm

因为npm命令行程序是依赖于node环境的，因此我们要先安装node：https://nodejs.org/en/download/，根据自己的电脑情况选择node版本下载下来即可。比如我的电脑是Windows 64位的系统，那么我可以选择**Windows Binary (.zip)** => **64bit**这个来下载，下载成功后解压，就可以看到有一个`node.exe`的可执行文件了，如果希望在电脑任意位置打开命令行工具后可以执行node命令或npm命令，需要把该目录位置加入到系统的PATH环境变量里面去。

安装node后，默认是带npm的，可以使用下面的命令检测node和npm是否安装成功

```shell
node -v
npm -v
```

如何更新npm到最新版本呢？

```shell
npm install -g npm@latest
```



## 包和模块(packages and modules)

### 包（packages）

包是一个文件或目录，其在package.json文件中去定义。包必须包含package.json文件才能发布到npm注册表。

包可以是无作用域的，也可以是用户或组织的作用域，作用域内的包可以是私有的或公共的。

#### **包可以是下面的任意一种格式**

a） 包含package.json文件描述的程序的文件夹。
b） 包含(a)的gzip压缩包。
c） 解析为（b）的URL。
d） 使用（c）在注册表中发布的<name>@<version>。
e） 指向（d）的<name>@<tag>。
f） 具有满足（e）的最新标签的＜name＞。
g） 一个git url，当被克隆时，结果为（a）。

#### **包的作用域**

作用域允许您创建与其他用户或组织创建的包同名的包，而不发生冲突。
当在package.json文件中作为依赖项列出时，作用域包的前面是其作用域名称。作用域名称是@和斜杠之间的所有内容：

- **"npm" scope:**

```
@npm/package-name
```

- **"npmcorp" scope:**

```
@npmcorp/package-name
```

#### **程序包名称指南**

为软件包选择名称时，请选择一个

- 是独一无二的
- 是描述性的
- 符合npm政策指南。例如，不要给你的包裹起冒犯性的名字，也不要使用他人的商标名或违反npm商标政策。

此外，在为未划分范围的包选择名称时，还应选择一个

- 尚未由其他人拥有
- 与其他程序包名称的拼写方式不同
- 不会混淆他人的作者身份



### **模块（modules）**

模块是node_modules目录中可以由node.js require()函数加载的任何文件或目录。
要能被Node.js require()函数加载，模块必须是以下之一：

- **包含包含“main”字段的package.json文件的文件夹**。
- JavaScript文件。

**注意：**由于模块不需要有“package.json”文件，所以并非所有模块都是包。只有具有“package.json”文件的模块也是包。
  在Node程序的上下文中，模块也是从文件加载的东西。例如以下程序：

```js
var req = require('request')
```

Node.js模块是一种可以发布到npm的包。

创建一个当另一个应用程序引用这个的模块时将加载的文件。在文件中，添加函数作为导出对象的属性。这将使该功能可用于其他代码：

```js
exports.printMsg = function() {
  console.log("This is a message from the demo package");
}
```



### package.json

您可以将package.json文件添加到您的包中，以便于其他人管理和安装。发布到注册表的包必须包含package.json文件。
package.json文件：

- 列出项目所依赖的包
- 指定项目可以使用语义版本控制规则使用的包的版本
- 使您的构建具有可复制性，因此更容易与其他开发人员共享

#### **如何快速创建一个package.json**

可以在命令行界面输入下面的指令

```
npm init -y
```

示例：

```json
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/monatheoctocat/my_package/issues"
  },
  "homepage": "https://github.com/monatheoctocat/my_package"
}
```

#### **必须要填名称和版本字段**

package.json文件必须包含“name”和“version”字段。

- “name”字段包含包的名称，必须是小写和一个单词，并且可以包含连字符和下划线。
- “版本”字段必须采用x.x.x格式，并遵循语义版本控制准则。

#### 语义版本控制

为了帮助依赖您的代码的开发人员，我们建议您的软件包版本从1.0.0开始，并按如下方式递增：

| Code status            | Stage        | Rule                                       | Example version |
| ---------------------- | ------------ | ------------------------------------------ | --------------- |
| 首次发布               | 新发布       | 从1.0.0开始                                | 1.0.0           |
| 向后兼容的错误修复     | 补丁发布     | 增加第三位                                 | 1.0.1           |
| 向后兼容的新功能       | 微量发布     | 增加中间数字并将最后一位重置为零           | 1.1.0           |
| 破坏性向后兼容性的更改 | 主要版本发布 | 增加第一个数字并将中间和最后的数字重置为零 | 2.0.0           |

#### **使用语义版本控制来指定包可以接受的更新类型**

您可以从包的package.json文件中的依赖项指定包可以接受哪些更新类型。
例如，要指定最高达1.0.4的可接受版本范围，请使用以下语法：

- 补丁版本：1.0或1.0.x或~1.0.4
- 次要版本：1或1.x或^1.0.4
- 主要版本：*或x

例如：

```json
"dependencies": {
  "my_dep": "^1.0.0",
  "another_dep": "~2.2.0"
},
```

#### 向包添加分发标签

分发标签（dist标签）是人类可读的标签，可用于组织和标记发布的不同版本的包。dist标签补充了语义版本控制。标签除了比语义版本编号更具可读性之外，还允许发布者更有效地分发其包。

> 注意：由于dist标记与语义版本共享一个命名空间，因此避免使用与现有版本号冲突的dist标记。我们建议避免使用以数字或字母“v”开头的dist标记。

**发布带有dist标记的包**

在命令行上，导航到包的根目录，执行如下命令：

```shell
npm publish --tag <tag>
# 如
npm publish --tag beta
```

**向包的特定版本添加dist标记**

在命令行上，导航到包的根目录，执行如下命令，将＜package_name＞替换为软件包的名称，＜version＞替换为您的软件包版本号，＜tag＞替换为分发标签：：

```shell
npm dist-tag add <package-name>@<version> [<tag>]
```

例如，要将“stable”标记添加到“example package”包的1.4.0版本，您需要运行以下命令：

```shell
npm dist-tag add example-package@1.4.0 stable
```



#### 指定dependencies 和devDependencies

要指定项目所依赖的包，必须在包的package.json文件中将它们列为“dependencies”或“devDependencies。”。当您（或其他用户）运行npm install时，npm将下载package.json中列出的依赖项和devDependencies，它们满足为每一个列出的语义版本要求。要查看将安装哪个版本的软件包，请使用[semver calculator](https://semver.npmjs.com/).。

- “dependencies ”：生产中应用程序所需的包。
- “devDependencies”：仅用于本地开发和测试的包。

**您可以从命令行或通过手动编辑package.json文件向package.json文件添加依赖项。**

```js
"name": "my_package",
"version": "1.0.0",
"dependencies": {
  "my_dep": "^1.0.0",
  "another_dep": "~2.2.0"
},
"devDependencies" : {
  "my_test_framework": "^3.1.0",
  "another_dev_dep": "1.0.0 - 1.2.0"
}
```



**也可以从命令行向package.json文件添加依赖项**

要从命令行将dependencies 和devDependencies添加到package.json文件中，可以使用dependencies 的--save prod标志（npm安装的默认行为）或devDependencies的--save dev标志将它们安装到包的根目录中。

- 要向package.json文件的“dependencies”属性添加条目，请在命令行上运行以下命令：

```
npm install <package-name> [--save-prod]
```

- 要向`package.json`文件的`“devDependencies”`属性添加条目，请在命令行上运行以下命令：

```
npm install <package-name> --save-dev
```



### README.md

为了帮助其他人在npm上找到您的包，并在他们的项目中使用您的代码，我们建议在您的包目录中包含一个README.md文件。README文件可能包括安装、配置和使用包中代码的说明，以及用户可能会发现的任何其他有用信息。README文件将显示在软件包页面上。



## 发布npm包

### 发布一个无范围的npm包

作为一个npm用户，您可以创建用于自己项目的无范围包，并将其发布到npm公共注册表中，供其他人在自己的项目中使用。无范围的程序包始终是公共的，仅通过程序包名称引用：

```shell
package-name
```
#### 制作包

1. 在命令行上，为包创建一个目录：

   ```
   mkdir my-test-package
   ```

2. 导航到软件包的根目录：

   ```
   cd my-test-package
   ```

3. 如果要使用git管理包代码，请在包根目录中运行以下命令，将“git remote url”替换为包的git remote URL：

   ```
   git init
   git remote add origin git://git-remote-url
   ```

4. 在包根目录中，运行“npm init”命令

5. 响应提示生成package.json文件

6. 创建一个README文件，用于描述包代码是什么以及如何使用它。

7. 在您首选的文本编辑器中，为您的包编写代码。



#### 测试包

为了减少发布错误的机会，我们建议在将包发布到npm注册表之前测试它。要测试您的包，请使用包目录的完整路径运行npm install：

```shell
npm install path/to/my-package
```



#### 发布包

1. 在命令行上，导航到包的根目录。

   ```
   cd /path/to/package
   ```

2. 要将公共包发布到npm注册表，请运行：

   ```
   npm publish
   ```

3. 查看您发布的包页面，访问网址：`https://npmjs.com/package/*package-name`，将`*package-name`替换为包的名称。公共程序包将在npm网站上的程序包名称下方显示Public。



## 更新和管理包

### **更新已发布的软件包版本号**

当您对已发布的包进行重大更改时，我们建议更新版本号，以便将更改的程度告知依赖您的代码的其他人。

> 注意：如果您已将git存储库链接到包，那么更新包版本号也会将带有更新版本号的标记添加到链接的git存储中。



要更改package.json中的版本号，请在命令行的packageroot目录中运行以下命令，将<update_type>替换为一种语义版本控制发布类型（patch、major或minor）：

```shell
# 更新版本号
npm version <update_type>
# 发布
npm publish
```



### 安装npm包

- **安装无作用域的包**

```shell
npm install <package_name>
```

- **安装有作用域公共包**

```shell
npm install @scope/package-name
```

- **安装私有包**

```shell
npm install @scope/private-package-name
```

- **已安装的软件包版本**
  如果运行npm install的目录中有package.json文件，则npm将安装满足package.json中声明的语义版本控制规则的最新版本的包。
  如果没有package.json文件，则安装最新版本的包。

- **安装带有分发标签的包**
  与npm-publish一样，npm-install＜package_name＞默认使用最新的标记。
  要覆盖此行为，请使用npm install＜package_name＞@＜tag＞。例如，要在标记为beta的版本上安装示例包，可以运行以下命令：

  ```shell
  npm install example-package@beta
  ```

- **安装到全局**

就是多一个`-g`的参数

```shell
npm install -g <package_name>
```



### 卸载npm包

如果您不再需要在代码中使用包，我们建议卸载它并将其从项目的依赖项中删除。

#### **卸载本地程序包**

- 从node_modules目录中删除本地包
  要从node_modules目录中删除包，请在命令行上使用uninstall命令。如果包具有作用域，则包含作用域。
  这将卸载一个包，完全删除代表它安装的所有npm。
  它还从package.json中的dependencies、devDependencies和optionalDependencie对象中删除包。
  此外，如果您有npm-shrinkwrap.json或package-lock.json，npm也会更新这些文件。

```shell
# 卸载无作用域的包
npm uninstall <package_name>
# 卸载有作用域的包
npm uninstall <@scope/package_name>
```

- 删除本地包而不从package.json中删除它
  使用--no save将告诉npm不要从package.json、npm-shrinkwrap.json或package-lock.json文件中删除包。

```shell
npm uninstall --no-save lodash
```

> --save或-S将告诉npm从package.json、npm-shrinkwrap.json和package-lock.json文件中删除包。这是默认设置，但如果在.npmrc文件中有例如save=false，则可能需要使用此设置。



#### **卸载全局程序包**

要卸载未扩展的全局包，请在命令行上使用带有-g标志的uninstall命令。如果包具有作用域，则包含作用域。

```shell
# 卸载全局无作用域的包
npm uninstall -g <package_name>
# 卸载全局有作用域的包
npm uninstall -g <@scope/package_name>
```



## 参考资料

- https://docs.npmjs.com/about-npm

