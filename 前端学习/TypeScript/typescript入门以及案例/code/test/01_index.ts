import 'reflect-metadata';

const IN_CLASS = 'inClass';
const in_METHOD = 'inMethod';

@Reflect.metadata(IN_CLASS, 'A')
class Test {
  @Reflect.metadata(in_METHOD, 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata(IN_CLASS, Test)); // 'A'
console.log(Reflect.getMetadata(in_METHOD, new Test(), 'hello')); // 'B'