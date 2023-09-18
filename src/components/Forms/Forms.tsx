import { FormEvent, useRef, useState } from "react";
import styles from "./Forms.module.scss";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_OPENAIKEY;

const Forms = () => {
  const [chatAnswer, setChatAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);

  const electricityInputRef = useRef<HTMLInputElement>(null);
  const renewableInputRef = useRef<HTMLSelectElement>(null);
  const transportInputRef = useRef<HTMLInputElement>(null);
  const vehicleEfficiencyInputRef = useRef<HTMLInputElement>(null);
  const dietInputRef = useRef<HTMLSelectElement>(null);
  const foodWasteInputRef = useRef<HTMLInputElement>(null);
  const garbageInputRef = useRef<HTMLInputElement>(null);
  const waterInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const enteredElectricity = electricityInputRef.current?.value;
    const enteredRenewable = renewableInputRef.current?.value;
    const enteredTransport = transportInputRef.current?.value;
    const enteredVehicleEfficiency = vehicleEfficiencyInputRef.current?.value;
    const enteredDiet = dietInputRef.current?.value;
    const enteredFoodWaste = foodWasteInputRef.current?.value;
    const enteredGarbage = garbageInputRef.current?.value;
    const enteredWater = waterInputRef.current?.value;

    const question = `Chat, I'll give you some of my data that are based on the average of a few months of my life. That said, I consume ${enteredElectricity} kWh of energy per month, where ${enteredRenewable}% comes from sustainable energy. In addition, I drive an average of ${enteredTransport} km per month with a vehicle that does ${enteredVehicleEfficiency} km per liter. I'm a person on a ${enteredDiet} diet and I waste around ${enteredFoodWaste} kg of food a month. In addition, I generate an average of ${enteredGarbage} kg of garbage and consume a total of ${enteredWater} liters of water. Based on this data, could you calculate my carbon footprint for me? No explanation needed, just the value and unit of measurement`;

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
      }),
    });

    const data = await response.json();

    setChatAnswer(data.choices[0].text);

    setLoading(false);
    setSubmited(true);
  };

  return (
    <>
      <header onClick={() => console.log(API_KEY)} className={styles.header}>
        <h1>Calculate your carbon footprint</h1>
      </header>
      {loading && (
        <div className={styles.loading}>
          <TailSpin
            height="80"
            width="80"
            color="#39b044"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {!loading && !submited && (
        <>
          <p className={styles.description}>
            We understand that providing precise answers to these questions can
            be challenging; therefore, just try to estimate the values based on
            an average spend.
          </p>
          <form
            className={styles.form}
            onSubmit={submitHandler}
            id="footprintForm"
          >
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="electricity">
                  How many kWh do you consume on average per month?
                </label>
                <input
                  ref={electricityInputRef}
                  type="number"
                  name="electricity"
                  id="electricity"
                  placeholder="On average, I consume..."
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="renewable">
                  How much of this is renewable energy?
                </label>
                <select ref={renewableInputRef} id="renewable">
                  <option value="0">0%</option>
                  <option value="25">25%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                </select>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="transport">
                  How many km do you drive on average per month? (not counting
                  public transport)
                </label>
                <input
                  ref={transportInputRef}
                  type="number"
                  name="transport"
                  id="transport"
                  placeholder="On average, I drive..."
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="vehicleEfficiency">
                  What is the efficiency of the vehicle?
                </label>
                <input
                  ref={vehicleEfficiencyInputRef}
                  type="number"
                  name="vehicleEfficiency"
                  id="vehicleEfficiency"
                  placeholder="X km per litre of fuel"
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="diet">What is your type of diet?</label>
                <select ref={dietInputRef} id="diet">
                  <option value="vegan">vegan</option>
                  <option value="vegetarian">vegetarian</option>
                  <option value="omnivore">omnivore</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="foodWaste">
                  On average, how many kg of food do you waste per month?
                </label>
                <input
                  ref={foodWasteInputRef}
                  type="number"
                  name="foodWaste"
                  id="foodWaste"
                  placeholder="On average, I waste..."
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="garbage">
                  How much waste (garbage) do you generate per month?
                </label>
                <input
                  ref={garbageInputRef}
                  type="number"
                  name="garbage"
                  id="garbage"
                  placeholder="On average, I generate..."
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="water">
                  On average, how many liters of water do you use per month?
                </label>
                <input
                  ref={waterInputRef}
                  type="number"
                  name="water"
                  id="water"
                  placeholder="On average, I..."
                />
              </div>
            </div>
          </form>
          <div className={styles.controls}>
            <button form="footprintForm" type="submit">
              Calculate
            </button>
          </div>
        </>
      )}
      {submited && !loading && chatAnswer && (
        <div className={styles.answerContainer}>
          <div className={styles.lottie}>
            <img src="/green-light.gif" />
          </div>
          <p>According to our AI:</p>
          <p>{'"'}{chatAnswer}{' "'}</p>
          <p>
            Do you want to minimize your impacts on the planet? Come and see the
            available carbon credits.
          </p>
          <Link href="/credits">See Credits</Link>
        </div>
      )}
    </>
  );
};

export default Forms;
