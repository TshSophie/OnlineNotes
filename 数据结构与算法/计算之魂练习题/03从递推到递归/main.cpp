
#include <iostream>
#include  <queue>
using   namespace  std;
typedef struct STreeNode{
	int value;
	STreeNode * pLeft;
	STreeNode * pRight;
	STreeNode(int v) :value(v), pLeft(NULL), pRight(NULL){}
}STreeNode;

bool _Insert(STreeNode *& pRoot, int value)
{
	if (!pRoot)
	{
		pRoot = new STreeNode(value);
		return true;
	}
	if (value < pRoot->value)
	{
		return _Insert(pRoot->pLeft, value);
	}
	if (value > pRoot->value)
	{
		return _Insert(pRoot->pRight, value);
	}
	return false;
}

// 广度优先遍历
void  breadthFirstSearch(STreeNode * root){
    queue <STreeNode  *>  nodeQueue;   // 使用C++的STL标准模板库
    nodeQueue.push(root);
    STreeNode  * node;
     while (!nodeQueue.empty()){
        node  =  nodeQueue.front();
        nodeQueue.pop();
        cout << node->value << "->";
         if (node->pLeft){
            nodeQueue.push(node->pLeft);   // 先将左子树入队
        }
         if (node -> pRight){
            nodeQueue.push(node->pRight);   // 再将右子树入队
        }
    }
}

int main(int argc, char ** argv) {

	STreeNode *pRoot;
	// 生成二叉树
	_Insert(pRoot, 'A');
	_Insert(pRoot, 'B');
	_Insert(pRoot, 'C');
	_Insert(pRoot, 'D');
	_Insert(pRoot, 'E');
	_Insert(pRoot, 'F');
	_Insert(pRoot, 'G');
	_Insert(pRoot, 'H');

	breadthFirstSearch(pRoot);
	return 0;
}