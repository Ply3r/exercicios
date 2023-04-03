class Cons {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  static fromArray(array) {
    //TODO provide a convenient method to convert a JavaScript array
    //to an algebraic list.
    let res = null;
    array.forEach((number) => res = new Cons(number, res));

    return res;
  }
}



