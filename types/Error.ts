/**
 * General bot errors
 */
export class E621BotError extends Error {
  constructor(message: string) {
    super(message);

    // Why did i do this?  Because https://github.com/microsoft/TypeScript-wiki/blob/81fe7b91664de43c02ea209492ec1cea7f3661d0/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, E621BotError);
  }
}

/**
 * E621 Site errors (errors with e621 site not the bot itself)
 */
export class E621SiteError extends Error {
  constructor(message: string) {
    super(message);

    // Why did i do this?  Because https://github.com/microsoft/TypeScript-wiki/blob/81fe7b91664de43c02ea209492ec1cea7f3661d0/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, E621SiteError);
  }
}

/**
 * Database errors with the bot
 */
export class E621DatabaseError extends Error {
  constructor(message: string) {
    super(message);

    // Why did i do this?  Because https://github.com/microsoft/TypeScript-wiki/blob/81fe7b91664de43c02ea209492ec1cea7f3661d0/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, E621DatabaseError);
  }

  getMessage(): string {
    return `E621 Database Error: ${this.message}`;
  }
}

/**
 * IO Errors that come from bad user input other IO issues
 */
export class E621BotIOErrors extends Error {
  constructor(message: string) {
    super(message);

    // Why did i do this?  Because https://github.com/microsoft/TypeScript-wiki/blob/81fe7b91664de43c02ea209492ec1cea7f3661d0/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, E621BotIOErrors);
  }

  getMessage(): string {
    return `E621 Bot IO Error: ${this.message}`;
  }
}
