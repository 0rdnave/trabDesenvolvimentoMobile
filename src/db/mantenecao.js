import db from "./SQLiteDatabase";

//   Funcionalidade 1 - Manter Ação (3 pontos)
// Descrição: Responsável por adicionar uma ação na carteira do usuário.
// Funcionamento: Deve possibilitar ao usuário incluir, ver, editar e excluir ações.
// Campos: ticker (código da ação, ex: TRAD3, BCFF11), tipo de invesmentimento (acao, cripto, fiis), quantidade de ações, valor pago e data.

db.transaction((tx) => {
  // tx.executeSql("DROP TABLE investimentos;");
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS investimentos (id INTEGER PRIMARY KEY AUTOINCREMENT, ticker TEXT, nome TEXT, tipo TEXT, quantidade INT, preco_compra REAL, preco_venda REAL, data_compra INT, data_venda);"
  );
});

export const inserirInvestimento = (prop) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO investimentos (ticker, nome, tipo, quantidade, preco_compra, preco_venda, data_compra, data_venda) values (?, ?,?,?, ?, ?, ?, ?);",
        [
          prop.ticker,
          prop.nome,
          prop.tipo,
          prop.quantidade,
          prop.precoCompra,
          prop.precoVenda,
          prop.dataCompra,
          prop.dataVenda,
        ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting prop: " + JSON.stringify(prop));
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const atualizarInvestimento = (id, prop) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE investimentos SET ticker=?, nome=?, tipo=?, quantidade=?, preco_compra=?, preco_venda=?, data_compra=?, data_venda=? WHERE id=?;",
        [
          prop.ticker,
          prop.nome,
          prop.tipo,
          prop.quantidade,
          prop.precoCompra,
          prop.precoVenda,
          prop.dataCompra,
          prop.dataVenda,
          id,
        ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Erro atualizando o prop: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const vendaInvestimento = (id, quantidade, prop) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE investimentos SET quantidade=?, preco_venda=?, data_venda=? WHERE id=?;",
        [quantidade, prop.precoVenda, prop.dataVenda, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Erro atualizando o prop: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const zerarPosicao = (prop) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE investimentos SET quantidade=?, preco_venda=?, data_venda=? WHERE ticker=?;",
        [prop.quantidade, prop.precoVenda, prop.dataVenda, prop.ticker],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Erro atualizando o prop: ticker=" + prop.ticker);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const encontrarId = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM investimentos WHERE id=?;",
        [id],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows);
          else reject("Obj not found: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};
export const encontrarTudoTicker = (ticker) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM investimentos WHERE ticker=?;",
        [ticker],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows);
          else reject("Obj not found: ticker=" + ticker);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const encontrarTicker = (ticker) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, ticker, nome, tipo, SUM(invest.qnt) qntTotal, SUM(invest.valor) valorTotal FROM(SELECT id, ticker,nome, tipo, sum(quantidade) qnt, sum(preco_compra * quantidade) valor FROM investimentos GROUP BY id) invest WHERE ticker = ? GROUP BY ticker;",
        [ticker],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows);
          else reject("Obj not found: ticker=" + ticker);
        },
        (_, error) => reject(error)
      );
    });
  });
};
export const valorInvestido = (ticker) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT SUM(preco_compra * quantidade) vTotal FROM investimentos WHERE ticker=? GROUP BY ticker;",
        [ticker],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows);
          else reject("Obj not found: ticker=" + ticker);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const encontrarTudo = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM investimentos;",
        [],
        (_, { rows }) => resolve(rows),
        (_, error) => reject(error)
      );
    });
  });
};
export const encontrarInvestimentos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, ticker, nome, tipo, SUM(invest.qnt) qntTotal, SUM(invest.valor) valorTotal, data_venda, preco_venda FROM(SELECT id, ticker,nome, tipo, sum(quantidade) qnt, sum(preco_compra * quantidade) valor, data_venda, preco_venda FROM investimentos GROUP BY id) invest GROUP BY ticker;",
        [],
        (_, { rows }) => resolve(rows),
        (_, error) => reject(error)
      );
    });
  });
};

export const encontrarPorTipo = (tipo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, ticker, nome, tipo, SUM(invest.qnt) qntTotal, SUM(invest.valor) valorTotal, data_venda, preco_venda FROM(SELECT id, ticker,nome, tipo, sum(quantidade) qnt, sum(preco_compra * quantidade) valor, data_venda, preco_venda FROM investimentos GROUP BY id) invest WHERE tipo = ? GROUP BY ticker;",
        [tipo],
        (_, { rows }) => resolve(rows),
        (_, error) => reject(error)
      );
    });
  });
};
export const encontrarPorTipoResumido = (tipo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT tipo, SUM(invest.qnt) qntTotal, SUM(invest.valor) valorTotal FROM(SELECT id, tipo, sum(quantidade) qnt, sum(preco_compra * quantidade) valor FROM investimentos GROUP BY id) invest WHERE tipo = ? GROUP BY tipo;",
        [tipo],
        (_, { rows }) => resolve(rows),
        (_, error) => reject(error)
      );
    });
  });
};

export const removerInvestimento = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM investimentos WHERE id=?;",
        [id],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const removerTudo = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM investimentos;",
        [],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};
