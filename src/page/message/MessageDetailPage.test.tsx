import { MessageDetailPage } from "@/page/message/MessageDetailPage";
import {
  createStore,
  renderApp,
  waitForLoadingToFinish,
  screen,
  createUser,
  createMessage,
  waitFor,
  waitForElementToBeRemoved,
} from "@/testing/test-utils";

const MESSAGE_SUBMIT_BUTTON = "message-submit-button";
const OPTIMISTIC_MESSAGE_ID = "optimistic-message-card";
const MESSAGE_ID = "message-card";
const TEST_MESSAGE = "test-message-text";

const testSubmit = async () => {
  const store = await createStore();
  const user = await createUser();
  await createMessage({ userId: user.id, storeId: store.id });

  const { userEvent } = await renderApp(<MessageDetailPage storeId={store.id} />);

  await waitForLoadingToFinish();

  const submitButton = screen.getByTestId(MESSAGE_SUBMIT_BUTTON);
  const textarea = screen.getByRole("textbox");

  await userEvent.type(textarea, TEST_MESSAGE);
  await userEvent.click(submitButton);

  await waitFor(async () => {
    const optimisticMessage = await screen.findByTestId(OPTIMISTIC_MESSAGE_ID);
    expect(optimisticMessage).toHaveTextContent(TEST_MESSAGE);
  });
};

describe("メッセージ詳細ページ", () => {
  describe("送信機能", () => {
    describe("送信に成功したとき", () => {
      test("楽観的更新用のメッセージが再検証されたメッセージで上書きされる", async () => {
        await testSubmit();

        await waitForElementToBeRemoved(() => screen.queryByTestId(OPTIMISTIC_MESSAGE_ID), {
          timeout: 3000,
        });

        expect(
          screen.getAllByTestId(MESSAGE_ID).find((el) => el.querySelector("p")?.textContent === TEST_MESSAGE),
        ).toBeInTheDocument();
      });
    });
  });
});
