type AddBtnProps = { showForm: boolean; onClick: () => void };

function AddBtn({ showForm, onClick }: AddBtnProps) {
  return (
    <button
      className={`btn__add ${showForm ? "" : "rotate45"}`}
      onClick={onClick}
    >
      <div
        style={{
          margin: "0 auto",
          width: "1.22rem",
          height: ".125rem",
          backgroundColor: "black",
          transformOrigin: "left",
          rotate: "z 45deg",
        }}
      ></div>
      <div
        style={{
          margin: "0 auto",
          width: "1.22rem",
          height: ".125rem",
          backgroundColor: "black",
          transformOrigin: "left",
          rotate: "z -45deg",
        }}
      ></div>
    </button>
  );
}

export default AddBtn;
