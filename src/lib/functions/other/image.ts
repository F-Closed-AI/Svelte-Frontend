import generated_1 from "$lib/img/generated_1.png";
import generated_2 from "$lib/img/generated_2.png";
import generated_3 from "$lib/img/generated_3.png";
import generated_4 from "$lib/img/generated_4.png";
// import generated_5 from "$lib/img/generated_5.png";
// // import generated_6 from "$lib/img/generated_6.png";
// import generated_5 from "$lib/img/generated_7.png";

const images = [
    generated_1,
    generated_2,
    generated_3,
    generated_4
]

export function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * (images.length - 0)) + 0;
    return images[randomIndex];
}