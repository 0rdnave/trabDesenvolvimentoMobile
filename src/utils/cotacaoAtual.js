export const cotacao = () => {
  const valor = Math.random() * (101 - 10) + 10;

  return Number.parseFloat(valor).toFixed(2);
};
