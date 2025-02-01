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

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;

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
    }

    if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }
    length++;
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
  remove(item: T): T | undefined {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }

    if (!curr) {
      return undefined;
    }
    this.length--;
    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (curr.prev) {
      curr.prev.next = curr.next;
    }

    if (curr.next) {
      curr.next.prev = curr.prev;
    }

    if (curr === this.head) {
      this.head = curr.next;
    }
    if (curr === this.tail) {
      this.tail = curr.prev;
    }

    curr.next = curr.prev = undefined;
    return curr.value;
  }
}
