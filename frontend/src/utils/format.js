const currencyFormat = (value) => `R$ ${value?.toFixed(2).replace(".", ",")}`;

export { currencyFormat };
