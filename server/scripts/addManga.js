const fs = require('fs');
const mongoose = require("mongoose");
const Manga = require("../server/models/mangas.model.js");
const AutoIncrement = require("../server/models/autoIncrement.model.js");

mongoose.connect('mongodb://localhost/HentaiHavenPL', {useNewUrlParser: true, useUnifiedTopology: true});

AutoIncrement.findOne({name: "manga"}).then((result) => {
    if(result == null){
        let meta = JSON.parse(fs.readFileSync('./public/manga/1/meta.json'));
        let autoIncrement = new AutoIncrement({
            name: "manga",
            autoIncrement: 1
        });
        autoIncrement.save().then(() => {
            let manga = new Manga({
                number: 1,
                title: meta.title,
                author: meta.author,
                authorLink: meta.authorLink,
                authorSupport: meta.authorSupport,
                tags: meta.tags,
                pages: meta.pages,
                characters: meta.characters,
                series: meta.series,
                translator: meta.translator
            });
            manga.save().then(() => {
                console.log("Manga dodana, jej id to 1");
                mongoose.connection.close();
            });
        });
    } else {
        let mangaNumber = result.autoIncrement + 1;
        let meta = JSON.parse(fs.readFileSync('./public/manga/' + mangaNumber + '/meta.json'));
        let manga = new Manga({
            number: mangaNumber,
            title: meta.title,
            author: meta.author,
            authorLink: meta.authorLink,
            authorSupport: meta.authorSupport,
            tags: meta.tags,
            pages: meta.pages,
            characters: meta.characters,
            series: meta.series,
            translator: meta.translator
        });
        manga.save().then(() => {
            AutoIncrement.findOneAndUpdate({name: "manga"}, {autoIncrement: mangaNumber}, {useFindAndModify: false}).then(() =>{
                console.log("Manga dodana. ID podniesione.");
                try{
                    let featurarr = JSON.parse(fs.readFileSync('./featured.json'));
                }
                catch{
                    let featurarr = {
                        "numbers": [],
                        "titles": [],
                        "tagsArr": [],
                    }
                }
                    if(featurarr.keys(obj).length){
                        featurarr = {
                            "numbers": [],
                            "titles": [],
                            "tagsArr": [],
                        }
                    }
                    if(featurarr.length < 5){
                        featurarr.numbers.unshift(mangaNumber);
                        featurarr.titles.unshift(meta.title);
                        featurarr.tagsArr.unshift(meta.tags);
                    }
                    else{
                        featurarr.numbers.unshift(mangaNumber);
                        featurarr.numbers.pop();
                        featurarr.titles.unshift(meta.title);
                        featurarr.titles.pop();
                        featurarr.tagsArr.unshift(meta.tags);
                        featurarr.tagsArr.pop();
                    }
                    //DODAJ TUTAJ RZECZY MORDO
                    //NIE ZAPOMNIJ
                    fs.writeFileSync('tu ma być ścieżka do featured.json', JSON.stringify({"numbers" : featurarr}, null));
                    mongoose.connection.close();
            });
        })
    }
});