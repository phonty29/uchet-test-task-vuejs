const debounce = (func: () => void, timeout: number) => {
    let timer: number;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this); }, timeout);
    };
}

export {debounce};