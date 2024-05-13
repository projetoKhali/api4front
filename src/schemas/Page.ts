export class Page<T> {
  content: T[];
  index: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;

  constructor(
    content: T[],
    number: number,
    totalPages: number,
    totalElements: number,
    first: boolean,
    last: boolean,
    size: number,
  ) {
    this.content = content;
    this.index = number;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.first = first;
    this.last = last;
    this.size = size;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static from<T>(response: any): Page<T> {
    return new Page<T>(
      response.content,
      response.number,
      response.totalPages,
      response.totalElements,
      response.first,
      response.last,
      response.size,
    );
  }

  static empty<T>(): Page<T> {
    return new Page<T>([], 0, 0, 0, true, true, 0);
  }
}
