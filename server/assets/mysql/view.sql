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


select _id
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
