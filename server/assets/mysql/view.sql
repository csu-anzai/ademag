insert into subtitle(id_article, subtitle_order, subtitle_text)
values(
    3,1,
    'subtitle 1 de 2'
)

insert into paragraphs(id_subtitle, paragraph_order, paragraph_text)
values(
    5,1,
    'parrafo 1 de sub 5'
)


select *
from articles
WHERE id_article = 17

select id_paragraph, subtitle.id_subtitle, paragraph_order, subtitle_order, paragraph_text 
from paragraphs, subtitle
where paragraphs.id_subtitle IN (
    select subtitle.id_subtitle
    from subtitle
    where subtitle.id_article = 2
)
and subtitle.id_subtitle = paragraphs.id_subtitle
order by subtitle_order, paragraph_order


SELECT * 
FROM articles 
WHERE _id = '5d4f43815114693c68d57fe7'

INSERT INTO articles (_id, title, description)
VALUES ('5d4f43815f114693c68d57fe7','title','description')


UPDATE articles
SET articles.description = 'NEW DESCRIPTION'
WHERE articles._id = '5d4f5117498f59645c38adf9'