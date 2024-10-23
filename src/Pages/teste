{editingCardIndex !== null && (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "30%",
                    width: "30%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#bfdbfe",
                    padding: "20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    borderRadius: "20px",
                    zIndex: 5000,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h3>Editar Card</h3>
                    <form
                      style={{
                        width: "100%",
                        borderRadius: "20px",
                      }}
                    >
                      <div class="tooltip">
                        <input
                          type="file"
                          name="image"
                          id="file-upload-imgcard"
                          onChange={(e) =>
                            handleCardChange(editingCardIndex, {
                              target: {
                                name: "image",
                                value: URL.createObjectURL(e.target.files[0]),
                              },
                            })
                          }
                        />

                        <span class="tooltiptext">Imagem card</span>

                        <label
                          htmlFor="file-upload-imgcard"
                          className="custom-file-upload"
                        >
                          <span>+</span> {/* Logo ou ícone */}
                        </label>
                        <span class="tooltiptext">Imagem 3</span>
                      </div>
                      <br />
                      <label>
                        Descrição do Produto:
                        <input
                          type="text"
                          name="description"
                          value={cards[editingCardIndex].description}
                          onChange={(e) =>
                            handleCardChange(editingCardIndex, e)
                          }
                          placeholder="Descrição do Produto"
                        />
                      </label>
                      <label>
                        Preço:
                        <input
                          type="text"
                          name="price"
                          value={cards[editingCardIndex].price}
                          onChange={(e) =>
                            handleCardChange(editingCardIndex, e)
                          }
                          placeholder="9,99"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveCard(editingCardIndex)}
                      >
                        Remover
                      </button>
                    </form>
                    <button
                      onClick={closeEditModal}
                      style={{
                        backgroundColor: "red",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "white",
                      }}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
