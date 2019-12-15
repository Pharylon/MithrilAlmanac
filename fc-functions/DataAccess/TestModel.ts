interface FOO {
  name: string;
  value: string;
}

export default function Test(): FOO {
  return {
    name: "FOO",
    value: "BAR",
  };
}
