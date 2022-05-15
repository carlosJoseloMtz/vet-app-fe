const isNotEnter = ev => {
  if (!ev) {
    return false;
  }

  return ev.key && ev.key !== 'Enter';
};

export { isNotEnter };
