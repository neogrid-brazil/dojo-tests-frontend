import React, {useState} from "react";

const Contador: React.FC = () => {
  const [value, setValue] = useState<number>(0)

  return (
    <>
      <p role="valorInicial">{value}</p>
      <button role="botao" onClick={() => setValue(value + 1)}>Adicionar +1</button>
    </>
  )
}

export default Contador
