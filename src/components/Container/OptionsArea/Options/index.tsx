import { useContext, useState } from "react";
import styles from "./index.module.scss";
import { I18n } from "@src/context/i18n";
import { Compression, CompressionOptions } from "@src/context/options";
import { ThemeStateContext } from "@src/context/theming";
import Select, { SelectOption } from "@src/components/UI/Select";
import Input from "@src/components/UI/Input";
import { genArr } from "@tools";
import { ReactComponent as QuestionSvg } from "@src/assets/icons/svg/question.svg"; // 问号

export default function Options() {
  const [i18n] = useContext(I18n);
  const [theme] = useContext(ThemeStateContext);
  const [compressionOptions, setCompressionOptions] =
    useContext(CompressionOptions);

  function setSpeed(value: number) {
    setCompressionOptions({
      ...compressionOptions,
      speed: value,
    });
  }

  function setQualityMinimum(value: number) {
    if (typeof value === "number") {
      value = Math.ceil(value);
    }
    setCompressionOptions({
      ...compressionOptions,
      qualityMinimum: value,
    });
  }

  function setQualityTarget(value: number) {
    if (typeof value === "number") {
      value = Math.ceil(value);
    }
    setCompressionOptions({
      ...compressionOptions,
      qualityTarget: value,
    });
  }

  function setDitheringLevel(value: number) {
    setCompressionOptions({
      ...compressionOptions,
      ditheringLevel: value,
    });
  }

  function setCompression(value: Compression) {
    setCompressionOptions({
      ...compressionOptions,
      compression: value,
    });
  }

  const [optionSpeed] = useState<SelectOption<number>[]>(
    genArr(1, 10).map((i) => ({
      value: i,
      label: i.toString(),
    }))
  );

  const [optionCompression] = useState<SelectOption<Compression>[]>([
    {
      value: Compression.Default,
      label: Compression.Default,
    },
    {
      value: Compression.Fast,
      label: Compression.Fast,
    },
    {
      value: Compression.Best,
      label: Compression.Best,
    },
  ]);

  function Title({ title, tips }: { title: string; tips: string }) {
    return (
      <div
        className={classNames(
          styles.label,
          styles[theme],
          "flex-jcfs-aic mar-b-10"
        )}
      >
        <span className="mar-r-2">{title}</span>
        <span
          className={classNames(styles.question, "flex-center")}
          title={tips}
        >
          <QuestionSvg></QuestionSvg>
        </span>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        styles.options,
        styles[theme],
        "grow w-100p pad-t-15 pad-lr-15"
      )}
    >
      <div className={classNames(styles.item, "mar-b-15")}>
        <Title
          title={i18n.optionsArea.options.speed}
          tips={i18n.optionsArea.options.speedTips}
        ></Title>
        <Select
          options={optionSpeed}
          value={compressionOptions.speed}
          setValue={setSpeed}
        ></Select>
      </div>
      <div className={classNames(styles.item, styles.quality, "mar-b-15")}>
        <Title
          title={i18n.optionsArea.options.quality}
          tips={i18n.optionsArea.options.qualityTips}
        ></Title>
        <div className="flex-jcfs-aic">
          <div className="flex-center mar-r-10">
            <div className="fs-12 mar-r-5">
              {i18n.optionsArea.options.qualityMinimum}
            </div>
            <Input
              className={classNames(styles.input)}
              value={compressionOptions.qualityMinimum}
              type="number"
              setValue={setQualityMinimum}
              min={0}
              max={compressionOptions.qualityTarget}
            ></Input>
          </div>
          <div className="flex-center">
            <div className="fs-12 mar-r-5">
              {i18n.optionsArea.options.qualityTarget}
            </div>
            <Input
              className={classNames(styles.input)}
              type="number"
              value={compressionOptions.qualityTarget}
              setValue={setQualityTarget}
              min={0}
              max={100}
            ></Input>
          </div>
        </div>
      </div>
      <div className={classNames(styles.item, "mar-b-15")}>
        <Title
          title={i18n.optionsArea.options.ditheringLevel}
          tips={i18n.optionsArea.options.ditheringLevelTips}
        ></Title>
        <Input
          className={classNames(styles.input, "w-100")}
          value={compressionOptions.ditheringLevel}
          type="number"
          setValue={setDitheringLevel}
          min={0}
          max={1}
          step={0.1}
        ></Input>
      </div>
      <div className={classNames(styles.item, "mar-b-15")}>
        <Title
          title={i18n.optionsArea.options.compression}
          tips={i18n.optionsArea.options.compressionTips}
        ></Title>
        <Select
          options={optionCompression}
          value={compressionOptions.compression}
          setValue={setCompression}
        ></Select>
      </div>
    </div>
  );
}
