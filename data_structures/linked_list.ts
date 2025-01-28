type DoublyLinkedNode<T> = {
  value: T;
  prev?: DoublyLinkedNode<T>;
  next?: DoublyLinkedNode<T>;
};

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: DoublyLinkedNode<T>;
  private tail?: DoublyLinkedNode<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  append(item: T): void {
    const node = { value: item } as DoublyLinkedNode<T>;

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
  }

  prepend(item: T): void {
    const node = { value: item } as DoublyLinkedNode<T>;

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;

    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("oh no");
    } else if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }

    let curr = this.head;

    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }

    curr = curr as DoublyLinkedNode<T>;
    const node = { value: item } as DoublyLinkedNode<T>;

    node.next = curr;
    node.prev = curr.prev;
    if (curr.prev) {
      curr.prev.next = node;
    }
    curr.prev = node;
  }
}
