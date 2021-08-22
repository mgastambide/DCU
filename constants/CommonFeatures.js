export default {
    shuffleArray(array_to_mix){
        for (let i = array_to_mix.length - 1; i > 0; i--) {
            let indiceAleatorio = Math.floor(Math.random() * (i + 1));
            let temporal = array_to_mix[i];
            array_to_mix[i] = array_to_mix[indiceAleatorio];
            array_to_mix[indiceAleatorio] = temporal;
        }
        return array_to_mix;
    },
    getRandomNumer(max_number, excepted_numbers){
        let exist = true;
        let random_number = 0;
        while (exist) {
            random_number = Math.floor(Math.random()*(max_number - 1)) + 1;
            exist = excepted_numbers.includes(random_number);
        }
        return random_number;
    },
    searchItem(words, correct_element){
        let i;
        let selectedItem = {};
        for (i = 0; i < words.length; i++) {
            if(words[i].id === correct_element.id){
                selectedItem = words[i]
            }
        }
        return selectedItem;
    }
}