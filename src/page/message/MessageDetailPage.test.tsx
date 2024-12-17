import { MessageDetailPage } from "@/page/message/MessageDetailPage";
import { messageErrorHandler } from "@/testing/mocks/handlers/message";
import { server } from "@/testing/mocks/server";
import {
  createStore,
  renderApp,
  waitForLoadingToFinish,
  screen,
  createUser,
  createMessage,
  waitFor,
  waitForElementToBeRemoved,
  userEvent,
} from "@/testing/test-utils";

const MESSAGE_SUBMIT_BUTTON = "message-submit-button";
const OPTIMISTIC_MESSAGE_ID = "optimistic-message-card";
const MESSAGE_ID = "message-card";
const TEST_MESSAGE = "test-message-text";

const testSubmit = async () => {
  const store = await createStore();
  const user = await createUser();
  await createMessage({ userId: user.id, storeId: store.id });

  await renderApp(<MessageDetailPage storeId={store.id} />);

  await waitForLoadingToFinish();

  const submitButton = screen.getByTestId(MESSAGE_SUBMIT_BUTTON);
  const textarea = screen.getByRole("textbox");

  await userEvent.type(textarea, TEST_MESSAGE);
  await userEvent.click(submitButton);

  const optimisticMessage = await screen.findByTestId(OPTIMISTIC_MESSAGE_ID);
  expect(optimisticMessage).toHaveTextContent(TEST_MESSAGE);
};

describe("メッセージ詳細ページ", () => {
  describe("送信機能", () => {
    describe("送信に成功したとき", () => {
      test("送信中は楽観的更新によるメッセージが表示され、再検証後に更新される", async () => {
        await testSubmit();

        await waitForElementToBeRemoved(() => screen.queryByTestId(OPTIMISTIC_MESSAGE_ID), {
          timeout: 3000,
        });

        expect(
          screen.getAllByTestId(MESSAGE_ID).find((el) => el.querySelector("p")?.textContent === TEST_MESSAGE),
        ).toBeInTheDocument();
      });
    });
    describe("送信に失敗したとき", () => {
      const testFailedSubmit = async () => {
        const alertFunc = vi.fn();
        window.alert = alertFunc;
        server.use(messageErrorHandler.messageSubmit);
        await testSubmit();
        await waitFor(() => {
          expect(alertFunc).toBeCalledTimes(1);
        });
        expect(screen.queryByTestId(OPTIMISTIC_MESSAGE_ID)).not.toBeInTheDocument();
      };

      test("楽観的更新用のメッセージが削除される", async () => {
        await testFailedSubmit();
      });

      test("再送信が可能な状態となっている", async () => {
        await testFailedSubmit();

        const submitButton = screen.getByTestId(MESSAGE_SUBMIT_BUTTON);
        await userEvent.click(submitButton);

        const optimisticMessage = await screen.findByTestId(OPTIMISTIC_MESSAGE_ID);
        expect(optimisticMessage).toHaveTextContent(TEST_MESSAGE);
      });
    });
  });
});
