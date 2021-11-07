 bpmn文件是activiti配置流程定义的文件，一般习惯将一个bpmn文件定义一个流程，文件格式为xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions>
    <process id="my-process">
	<startEvent id="start"/>
	    <sequenceFlow id="flow1" sourceRef="start" targetRef="someTask" />
	<userTask id="someTask" name="Activiti is awesome!" />
	    <sequenceFlow id="flow2" sourceRef="someTask" targetRef="end" />
	<endEvent id="end"/>
    </process>
</definitions>
```

process：流程定义根元素，代表了一个流程定义的开始

id：流程定义ID，代表该流程的唯一性，启动该流程时需要使用该ID
isExecutable：表示该流程是否可执行，其值有true和false，默认为true
name：流程名称
type：流程类型
isClosed：流程是否已关闭,关闭不能执行
 startEvent：流程启动事件，一个process只能有一个,且必须为流程起始元素

id：启动节点id
name：启动节点名称
 userTask： 流程中间用户任务,夹在startEvent与endEvent之间的节点，表示需要待办人处理的节点

id:   任务节点id，必须是唯一的
name：任务节点名称
activiti:assignee       任务所属用户,只能指定用户完成这个任务,即任务办理人
activiti:candidateUsers 多个任务办理人
activiti:candidateGroups 任务处理人候选组,处理人必须在这个组内
activiti:exclusive    独家的,好像是在排它性网关中使用,意思应该是在有并行分支情况下,只会走其中一条
activiti:dueDate      设置用户任务到期日期
activiti:priority     用户任务优先级,0-100
  extensionElements: userTask的子元素,用于扩展元素 

  activiti:taskListener: 扩展元素之一,用于监听某个任务的运行

<userTask>
    <extensionElements>
        <activiti:taskListener></activiti:taskListener>
    </extensionElements>
</userTask>
属性名	含义
event	监听的任务事件名,create、assignment（分配任务）、complete
class	任务监听器类,需要实现TaskListener
 

 sequenceFlow：顺序流

id：       顺序流id
sourceRef：上一个节点id
targetRef: 下一个节点id
 conditionExpression: sequenceFlow子元素,根据表达式确定是否执行这一顺序流,一条顺序流只能联系两个节点如果需要表达式判断,有多条顺序流连接了同一开始节点,一般这样的开始节点都是网关

<sequenceFlow>
    <conditionExpression></conditionExpression>
</sequenceFlow>
属性名	        含义
xsi:type	含义不知道,值为tFormalExpression
子元素	        表达式,${days <= 3}
exclusiveGateway: 排它性网关,即多个sequenceFlow以网关节点开始时,只根据条件执行其中一条流,其他流不再判断

虽然与userTask同属于节点,但是其不作为任务执行

属性名	含义
id	节点id
name	节点名称
gatewayDirection	网关方向,Unspecified
 

 

 endEvent：流程结束事件,一个process只能有一个,且必须为流程结束元素

id：结束节点id
name：结束节点名称
 在userTask节点中几种指定代办人的方法，${} 表示使用参数的传递，当然也可以传具体值

 candidateUsers  指定的是代办人，如下图配置参数

# 参数 ${productUsers}
candidateUsers="${productUsers}"
 
# 传递具体值时多个参数用英文逗号分隔
candidateUsers="张三,李四,王五"
 candidateGroups  指定的是用户组，如下图配置参数

# 指定传递参数的用户组
candidateGroups="${requireGroup}"
# 指定具体的用户组
candidateGroups="approver_group"
 assignee 指定办理人，如下图配置参数

# 指定含有参数的办理人
assignee="${user}"
# 指定具体的办理人
assignee="张三"
candidateUsers和candidateGroups组代办任务，assigne个人待办任务，组代办任务认领后变成个人待办任务，解除认领回到组待办任务，这些再实际运用中会常见。