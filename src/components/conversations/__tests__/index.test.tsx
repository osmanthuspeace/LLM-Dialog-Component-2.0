import Conversations from '../index';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, expectTypeOf } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';

const items = [
  {
    key: '1',
    title: 'Monorepo包配置与管理指南',
    lastMessage: 'Package Configuration for Monorepo',
    timestamp: Date.now(),
    group: '今天',
  },
  {
    key: '2',
    title: '前端开发规范文档',
    lastMessage: 'Frontend Development Guidelines',
    timestamp: Date.now() - 3600000,
    group: '今天',
  },
  {
    key: '3',
    title: '项目架构设计方案',
    lastMessage: 'Project Architecture Design',
    timestamp: Date.now() - 86400000 * 3,
    group: '3 天内',
  },
];

const renameFn = vi.fn();

const deleteFn = vi.fn();

const menu = conversation => ({
  items: [
    {
      key: 'rename',
      label: '重命名',
      onClick: renameFn,
    },
    {
      key: 'delete',
      label: '删除',
      onClick: deleteFn,
    },
  ],
});

describe('Conversations', () => {
  it('Conversations component work', () => {
    const { container } = render(<Conversations></Conversations>);

    expect(
      container.querySelector('.conversations-container')
    ).toBeInTheDocument();
  });

  it('Conversations support items', () => {
    render(<Conversations items={items}></Conversations>);
    expect(screen.getByText(/Monorepo包配置与管理指南/i));
    expect(screen.getByText(/项目架构设计方案/i));
  });

  it('Conversations handle activeKey', () => {
    const { getByText } = render(
      <Conversations items={items} activeKey="2"></Conversations>
    );
    const activeItem = getByText('前端开发规范文档');
    expect(activeItem.parentNode?.parentNode).toHaveClass('active');
  });

  it('Conversations handle defaultActiveKey', () => {
    const { getByText } = render(
      <Conversations items={items} defaultActiveKey="2"></Conversations>
    );
    const activeItem = getByText('前端开发规范文档');
    expect(activeItem.parentNode?.parentNode).toHaveClass('active');
  });

  it('Conversations handle onActiveChange', () => {
    const onActiveChange = vi.fn();
    const { getByText } = render(
      <Conversations
        items={items}
        onActiveChange={onActiveChange}
      ></Conversations>
    );

    fireEvent.click(getByText('前端开发规范文档'));
    expect(onActiveChange).toHaveBeenCalledWith('2');
    fireEvent.click(getByText('项目架构设计方案'));
    expect(onActiveChange).toHaveBeenCalledWith('3');
    fireEvent.click(getByText('Monorepo包配置与管理指南'));
    expect(onActiveChange).toHaveBeenCalledWith('1');
  });

  it('Conversations handle menu', () => {
    const { getByText, container } = render(
      <Conversations
        items={items}
        menu={menu}
        defaultActiveKey="2"
      ></Conversations>
    );
    const menuBtn = container.querySelectorAll('.menu-button');
    fireEvent.click(menuBtn[0]);
    expect(container.querySelectorAll('.menu-item')[0]).toBeInTheDocument();
    fireEvent.click(container.querySelectorAll('.menu-item')[0]);
    expect(renameFn).toHaveBeenCalled();
  });

  it('Conversations handle groupable', () => {
    const { getByText } = render(
      <Conversations items={items} groupable></Conversations>
    );
    expect(getByText('今天')).toBeInTheDocument();
    expect(getByText('3 天内')).toBeInTheDocument();
  });
});
