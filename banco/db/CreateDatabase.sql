USE botecobrasil;

CREATE TABLE contatos (
    Data_de_inicio DATE,
    Nome VARCHAR(255),
    Contato VARCHAR(20),
    Anuncio VARCHAR(255),
    Observacao TEXT,
    Valor_fichas DECIMAL(10, 2),
    Status VARCHAR(50)
);

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

INSERT INTO contatos (Data_de_inicio, Nome, Contato, Anuncio, Observacao, Valor_fichas, Status) 
VALUES
('2024-08-08', 'Hevandro', '48996398999', 'Bio Instagram', NULL, NULL, 'Não Respondeu'),
('2024-08-08', 'Marcelo Ferreira', '21977465701', 'Bio Instagram', NULL, NULL, 'Não Respondeu'),
('2024-08-09', 'Propk', '87992128243', 'Bio Instagram', NULL, NULL, 'Não Respondeu'),
('2024-08-08', 'Ronald de Lima', '48991754050', 'Bio Instagram', NULL, NULL, 'Não Respondeu'),
('2024-08-09', 'Solange', '45998577564', 'Bio Instagram', NULL, NULL, 'Não Respondeu');


CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email; VARCHAR(255),
    senha VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, senha)
VALUES
('root@root.com.br','root');




