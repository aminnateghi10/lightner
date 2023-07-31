export const translate = async (source, target, text) => {
    const url =
        'https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e';
    const fields = {
        sl: encodeURIComponent(source),
        tl: encodeURIComponent(target),
        q: encodeURIComponent(text),
    };

    const requestOptions = {
        method: 'POST',
        body: Object.keys(fields)
            .map((key) => `${key}=${fields[key]}`)
            .join('&'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        const translation = getSentencesFromJSON(data);
        return translation;
    } catch (error) {
        console.error('Translation error:', error);
    }
};

const getSentencesFromJSON = (json) => {
    const sentencesArray = json.sentences || [];

    const dict = json.dict || null;
    let sentences = '';

    sentencesArray.forEach((s) => {
        if (s.trans) {
            sentences += s.trans;
        }
    });

    return {sentences, dict};
};
