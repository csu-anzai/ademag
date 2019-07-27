
test asyn fonction get
router.get('/test', async(req, res)=>{
    let result = await asyncMysql('select 1 as n1')
    let result2 = await asyncMysql('select 2 as n2')
    let result3 = await asyncMysql('select 3 as n3')
    let result4 = await asyncMysql('select 4 as n4')
    let resultFinal = result[0].n1 + result2[0].n2 + result3[0].n3 + result4[0].n4
    console.log(resultFinal)
    res.send(`${resultFinal}`)
})
