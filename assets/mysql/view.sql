insert into subtitle(id_article, subtitle_order, subtitle_text)
values(
    3,1,
    'subtitle 1 de 2'
)

select subtitle.*, articles.id_article
from subtitle,articles 
where subtitle.id_article = articles.id_article

