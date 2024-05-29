async function translateText(text) {
  const correo = "jsuchmolin@gmail.com";

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=en|es&de=${correo}`
    );
    const data = await response.json();

    if (data.responseData) {
      return data.responseData.translatedText;
    } else {
      throw new Error("No se pudo obtener la traducción");
    }
  } catch (error) {
    console.error(error);
  }
}

export default translateText;
